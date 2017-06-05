/* @flow */

import config from 'config';
import moment from 'moment';

import redis from '../../../redis';

const TIMER = {};

export default class Cache {
  static setVal(key: string, value: *): Promise {
    if (!value) return Promise.resolve(value);

    console.log('setting cache key', key);

    return redis.msetAsync([key, JSON.stringify(value)]).then(() => {
      TIMER[key] = moment();

      return value;
    });
  }

  static getVal(key: string): Promise {
    if (Cache.hasExpired(key)) return Promise.resolve(false);

    return redis.mgetAsync(key).then(v => (v ? JSON.parse(v) : null));
  }

  /**
   * Checks if the cache has expired
   *
   * @param {String} tableName
   * @returns {boolean}
   */
  static hasExpired(key: string): boolean {
    return !TIMER[key]
      || moment().diff(TIMER[key], 'minutes') > config.get('query.cacheTimeLimit');
  }
}
