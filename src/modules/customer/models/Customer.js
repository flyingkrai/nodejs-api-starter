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
import AbstractModel from '../../shared/models/AbstractModel';

export default class Customer extends AbstractModel {

  static TABLE = 'customers';

  static ID_KEY = 'id';

  static DOC_KEY = 'cpf';

  static findOneByDoc(doc: string) {
    return db.table(Customer.TABLE)
      .where({ [Customer.DOC_KEY]: doc })
      .first();
  }
}
