/* @flow */

import config from 'config';
import DataLoader from 'dataloader';
import moment from 'moment';

import redis from '../../../redis';

const LOADERS = {};
const FETCH_TIMER = {};

export default class TableCache {

  /**
   * Creates a cache key, valey array for redis
   *
   * @param {String} tableName
   * @param {Object} item
   * @returns {[string, string]}
   */
  static createCacheArray(tableName: string, item: Object): Array<string> {
    return [`${tableName}:${item.id}`, JSON.stringify(item)];
  }

  /**
   * Update a single cache item
   *
   * @param {String} tableName
   * @param {Object} item
   * @returns {Promise}
   */
  static updateCacheItem(tableName: string, item: Object): Promise {
    return redis.msetAsync(this.createCacheArray(tableName, item));
  }

  /**
   * Update a single cache item asynchronously
   * @param tableName
   * @param item
   */
  static updateCacheItemAsync(tableName: string, item: Object) {
    TableCache.updateCacheItem(tableName, item)
      .then(() => console.log(`----> cache refreshed form ${tableName}:${item.id}`));
  }

  /**
   * Update cache for given table
   *
   * @param {String} tableName
   * @param {Object} Model
   * @returns {Promise}
   */
  static update(tableName: string, Model: Object): Promise {
    FETCH_TIMER[tableName] = moment();

    return Model.all()
      .then((items) => {
        if (!items || !items.length) return [];

        return redis
          .msetAsync(
            items.reduce((list, item) =>
              list.concat(TableCache.createCacheArray(tableName, item)), []),
          )
          .then(() => items);
      });
  }

  /**
   * Update cache for given table asynchronously
   *
   * @param {String} tableName
   * @param {Object} Model
   */
  static updateAsync(tableName: string, Model: Object) {
    TableCache.update(tableName, Model)
      .then(() => console.log(`----> cache refreshed for ${tableName}`));
  }

  /**
   * Checks if the cache has expired
   *
   * @param {String} tableName
   * @returns {boolean}
   */
  static hasExpired(tableName: string): boolean {
    return !FETCH_TIMER[tableName]
      || moment().diff(FETCH_TIMER[tableName], 'minutes') > config.get('query.cacheTimeLimit');
  }

  /**
   * Retrieves the dataloader for given table
   *
   * @param {String} tableName
   * @param {Object} Model
   * @returns {Object}
   */
  static getLoader(tableName: string, Model): Object {
    if (LOADERS[tableName]) return LOADERS[tableName];

    LOADERS[tableName] = new DataLoader(keys => Promise.resolve()
      .then(() => TableCache.hasExpired(tableName) ? TableCache.update(tableName, Model) : null) // eslint-disable-line
      .then(() => redis.mgetAsync(keys.map(key => `${tableName}:${key}`)))
      .then(data => data.map((item, i) => {
        if (item) return Model.parse(JSON.parse(item));
        throw new Error(`Cannot find an article with ID ${keys[i]}`);
      })));

    return LOADERS[tableName];
  }

  /**
   * Loads all items from cache
   *
   * @param {String} tableName
   * @param {Object} Model
   * @returns {Promise}
   */
  static all = async (tableName: string, Model): Promise => {
    const keys = await redis.keysAsync(`${tableName}:*`);
    const data = keys.length ?
      (await redis.mgetAsync(keys)).map(x => JSON.parse(x)) :
      (await TableCache.update(tableName, Model));

    // Update cache in the background if it's older than config
    if (TableCache.hasExpired(tableName)) TableCache.updateAsync(tableName, Model);

    return data.map(item => Object.assign(new Model(), item));
  };
}
