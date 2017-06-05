/* @flow */

import db from '../../../db';
import TableCache from './TabeCache';

export default class AbstractModel {

  static TABLE;
  static ID_KEY;

  /**
   * Loads given keys
   *
   * @param {Array} keys
   * @returns {Array}
   */
  static load(keys) {
    return TableCache.getLoader(this.TABLE, this).load(keys);
  }

  /**
   * Finds all
   * @returns {Promise.<void>}
   */
  static async find() {
    return TableCache.all(this.TABLE, this);
  }

  /**
   * Finds a record by id
   *
   * @param {String} id
   * @returns {Promise}
   */
  static findOneById(id: string) {
    return TableCache.getLoader(this.TABLE, this).load(id);
  }

  /**
   * Loads all records
   *
   * @returns {Promise}
   */
  static all() {
    return db.table(this.TABLE).select('*').map(x => this.parse(x));
  }

  /**
   * Finds one record by given args
   *
   * @param {Array} args
   * @returns {Promise}
   */
  static findOne(...args) {
    return db.table(this.TABLE).where(...args).first().then(this.parse);
  }

  /**
   * Finds all records by given args
   *
   * @param {Array} args
   * @returns {Promise}
   */
  static findAll(...args) {
    return db.table(this.TABLE).where(...args).then(records => records.map(this.parse));
  }

  /**
   * Finds any record matching given args
   *
   * @param {Array} args
   * @returns {Promise}
   */
  static any(...args) {
    return db.raw('SELECT EXISTS ?', db.table(this.TABLE).where(...args).select(db.raw('1')))
      .then(x => x.rows[0].exists);
  }

  /**
   * Creates a new record
   *
   * @param {Object} data
   * @returns {Promise}
   */
  static create(data) {
    return db.table(this.TABLE)
      .insert(data)
      .returning('id')
      .then(id => this.findOne({ [this.ID_KEY]: id }))
      .then((item) => {
        TableCache.updateCacheItemAsync(this.TABLE, item);

        return item;
      });
  }

  /**
   * Updates a record
   *
   * @param {String} id
   * @param {Object} data
   * @returns {Promise}
   */
  static update(id, data) {
    const where = { [this.ID_KEY]: id };

    return db.table(this.TABLE)
      .where(where)
      .update(data)
      .then((x) => {
        this
          .findOne(where)
          .then(item => TableCache.updateCacheItem(this.TABLE, item));

        return x[0];
      });
  }

  static db() {
    return db;
  }

  static cache() {
    return TableCache;
  }

  /**
   * Parses given data into current model instance
   *
   * @param {Object|null} data
   * @returns {Object|null}
   */
  static parse(data) {
    return data ? Object.assign(new this(), data) : null;
  }
}
