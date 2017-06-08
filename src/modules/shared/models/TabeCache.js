/* @flow */

import config from 'config';
import moment from 'moment';

import redis from '../../../redis';

const CACHES = {};
const LOADERS = {};
const FETCH_TIMER = {};

class TableCache {
  tableName;

  Model;

  constructor(tableName, Model) {
    this.tableName = tableName;
    this.Model = Model;
  }

  /**
   * Creates a cache key, valeu array for redis
   *
   * @param {Object} item
   * @returns {[string, string]}
   */
  createCacheArray(item: Object): Array<string> {
    return [`${this.tableName}:${item.id}`, JSON.stringify(item)];
  }

  /**
   * Update a single cache item
   *
   * @param {Object} item
   * @returns {Promise}
   */
  updateCacheItem(item: Object): Promise {
    return redis.msetAsync(this.createCacheArray(item));
  }

  /**
   * Update a single cache item asynchronously
   * @param tableName
   * @param item
   */
  updateCacheItemAsync(item: Object) {
    this.updateCacheItem(item)
      .then(() => console.log(`----> cache refreshed form ${this.tableName}:${item.id}`));
  }

  /**
   * Update cache for given table
   *
   * @returns {Promise}
   */
  update(): Promise {
    FETCH_TIMER[this.tableName] = moment();

    return this.Model.all()
      .then((items) => {
        if (!items || !items.length) return [];

        return redis
          .msetAsync(
            items.reduce((list, item) =>
              list.concat(this.createCacheArray(item)), []),
          )
          .then(() => items);
      });
  }

  /**
   * Update cache for given table asynchronously
   */
  updateAsync() {
    this.update()
      .then(() => console.log(`----> cache refreshed for ${this.tableName}`));
  }

  /**
   * Checks if the cache has expired
   *
   * @returns {boolean}
   */
  hasExpired(): boolean {
    return !FETCH_TIMER[this.tableName]
      || moment().diff(FETCH_TIMER[this.tableName], 'minutes') > config.get('query.cacheTimeLimit');
  }

  /**
   * Loads all items from cache
   *
   * @returns {Promise}
   */
  async all(): Promise {
    const keys = await redis.keysAsync(`${this.tableName}:*`);
    const data = keys.length ?
      (await redis.mgetAsync(keys)).map(x => JSON.parse(x)) :
      (await this.update());

    // Update cache in the background if it's older than config
    if (this.hasExpired()) this.updateAsync();

    return data.map(item => Object.assign(new this.Model(), item));
  }
}

export default (table, Model) => {
  if (!CACHES[table]) CACHES[table] = new TableCache(table, Model);

  return CACHES[table];
};
