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
