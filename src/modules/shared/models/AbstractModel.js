/* @flow */

import DataLoader from 'dataloader';
import moment from 'moment';
import config from 'config';

import db from '../../../db';
import redis from '../../../redis';

const loaders = {};
const lastFetchTimes = {};

const createCacheArray = (tableName: string, item: Object): Array =>
  [`${tableName}:${item.id}`, JSON.stringify(item)];

const setCacheItem = (tableName: string, item: Object): Promise =>
  redis.msetAsync(createCacheArray(tableName, item));

const setCacheItemAsync = (tableName: string, item: Object) => {
  setCacheItem(tableName, item)
    .then(() => console.log(`----> cache refreshed form ${tableName}:${item.id}`));
};

async function fetchItems(tableName, Model) {
  lastFetchTimes[tableName] = moment();
  const items = await Model.all();
  await redis.msetAsync(items
    .reduce(
      (list, item) => list.concat(createCacheArray(tableName, item)), []));

  return items;
}

function fetchItemsAsync(tableName, Model) {
  fetchItems(tableName, Model)
    .then(() => console.log(`----> cache refreshed for ${tableName}`));
}

function setupLoader(tableName, Model) {
  loaders[tableName] = new DataLoader(keys => Promise.resolve()
    .then(() => lastFetchTimes[tableName] ? null : fetchItems(tableName, Model)) // eslint-disable-line
    .then(() => redis.mgetAsync(keys.map(x => `${tableName}:${x}`)))
    .then(data => data.map((x, i) => {
      if (x) return Object.assign(new Model(), x);

      throw new Error(`Cannot find an item with ID ${keys[i]}`);
    })));
}

export default class AbstractModel {

  static TABLE;
  static ID_KEY;

  constructor() {
    setupLoader(this.TABLE, this);
  }

  /**
   * Loads given keys
   *
   * @param {Array} keys
   * @returns {Array}
   */
  static load(keys) {
    return loaders[this.TABLE].load(keys);
  }

  /**
   * Finds all
   * @returns {Promise.<void>}
   */
  static async find() {
    const keys = await redis.keysAsync(`${this.TABLE}:*`);
    const data = keys.length ?
      (await redis.mgetAsync(keys)).map((x, i) => ({ id: keys[i], ...JSON.parse(x) })) :
      (await fetchItems(this.TABLE, this));

    // Update cache in the background if it's older than config
    if (
      !lastFetchTimes[this.TABLE]
      || moment().diff(lastFetchTimes[this.TABLE], 'minutes') > config.get('query.cacheTimeLimit')
    ) {
      fetchItemsAsync(this.TABLE, this);
    }

    return data.map(x => Object.assign(new this(), x));
  }

  static findOneById(id: string) {
    return this.find().then(list => list.find(item => item.id === id));
  }

  static all() {
    return db.table(this.TABLE).map(x => this.parse(x));
  }

  static findOne(...args) {
    return db.table(this.TABLE).where(...args).first().then(x => this.parse(x));
  }

  static any(...args) {
    return db.raw('SELECT EXISTS ?', db.table(this.TABLE).where(...args).select(db.raw('1')))
      .then(x => x.rows[0].exists);
  }

  static create(data) {
    return db.table(this.TABLE)
      .insert(data)
      .returning('id')
      .then(id => this.findOne({ [this.ID_KEY]: id }))
      .then((item) => {
        setCacheItemAsync(this.TABLE, item);

        return item;
      });
  }

  static update(id, data) {
    const where = { [this.ID_KEY]: id };

    return db.table(this.TABLE)
      .where(where)
      .update(data)
      .then((x) => {
        this
          .findOne(where)
          .then(item => setCacheItemAsync(this.TABLE, item));

        return x[0];
      });
  }

  static parse(x) {
    return x ? Object.assign(new this(), x) : null;
  }
}
