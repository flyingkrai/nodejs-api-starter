/* @flow */

import bookshelf from './bookshelf';

export default class AbstractModel extends bookshelf.Model {
  constructor(props) {
    super(props);
    this.on('saving', this.beforeSave.bind(this));
    this.on('saved', this.afterSave.bind(this));
  }

  /**
   * Creates a unique search key to be used as cache identifier
   * @param {Array} params
   * @returns {String}
   */
  static makeSearchKey(...params) {
    const keys = params.filter(p => p);
    const hash = new Buffer(`${keys.join('')}`).toString('base64');

    return `${this.tableName}:search:${hash}`;
  }

  static find() {
    return this
      .fetchAllCache({ serial: this.tableName })
      .then(results => results.toJSON());
  }

  beforeSave(model, attrs, options) {
    console.log('model', model);
    console.log('attrs', attrs);
    console.log('options', options);
  }

  afterSave(model, attrs, options) {
    // @TODO clean cache
    console.log('model', model);
    console.log('attrs', attrs);
    console.log('options', options);
  }
}
