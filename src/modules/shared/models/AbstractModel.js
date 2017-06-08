/* @flow */

import bookshelf from './bookshelf';

export default class AbstractModel extends bookshelf.Model {
  static find() {
    return this
      .fetchAllCache({ serial: this.tableName })
      .then(results => results.toJSON());
  }
}
