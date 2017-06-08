/* @flow */

import bookshelf from './bookshelf';

export default class AbstractModel extends bookshelf.Model {
  constructor(props) {
    super(props);
    this.on('saving', this.beforeSave.bind(this));
  }

  static find() {
    return this
      .fetchAllCache({ serial: this.tableName })
      .then(results => results.toJSON());
  }

  beforeSave(model, attrs, options) {
    console.log(model, attrs, options);
  }
}
