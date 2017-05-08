/* @flow */

import db from '../../../db';
import Cache from './Cache';

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
    return Cache.getLoader(this.TABLE, this).load(keys);
  }

  /**
   * Finds all
   * @returns {Promise.<void>}
   */
  static async find() {
    return Cache.all(this.TABLE, this);
  }

  static findOneById(id: string) {
    return Cache.getLoader(this.TABLE, this).load(id);
  }

  static all() {
    return db.table(this.TABLE).select('*').map(x => this.parse(x));
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
        Cache.updateCacheItemAsync(this.TABLE, item);

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
          .then(item => Cache.updateCacheItem(this.TABLE, item));

        return x[0];
      });
  }

  static parse(x) {
    return x ? Object.assign(new this(), x) : null;
  }
}
