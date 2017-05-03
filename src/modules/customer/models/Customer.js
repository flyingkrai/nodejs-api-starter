/**
 * Node.js API Starter Kit (https://reactstarter.com/nodejs)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import db from '../../../db';

class Customer {

  static DOC_KEY = 'cpf';

  static findOne(...args) {
    return db.table('customers').where(...args).first('id', 'email');
  }

  static findOneByDoc(doc: string) {
    return db.table('customers')
      .where({ [Customer.DOC_KEY]: doc })
      .first('id', 'email');
  }

  static any(...args) {
    return db.raw('SELECT EXISTS ?', db.table('customers').where(...args).select(db.raw('1')))
      .then(x => x.rows[0].exists);
  }

  static create(data) {
    return db.table('customers')
      .insert(data, ['id', 'email']).then(x => x[0]);
  }
}

export default User;
