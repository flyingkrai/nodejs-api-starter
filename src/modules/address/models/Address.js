/* @flow */

import AbstractModel from '../../shared/models/AbstractModel';
import Cache from '../../shared/lib/Cache';

export default class Address extends AbstractModel {

  static TABLE = 'address';

  static ID_KEY = 'id';

  static findByCustomer(customer) {
    const key = `customers_address:${customer}`;

    return Cache
      .getVal(key)
      .then((records) => {
        if (records) return records;

        return this.db()
          .from(this.TABLE)
          .innerJoin('customer_address', 'customer_address.address_id', `${this.TABLE}.id`)
          .where('customer_address.customer_id', customer)
          .then(rows => Cache.setVal(key, rows));
      })
      .then(records => records.map(r => this.parse(r)));
  }

  static addToCustomer(customerId, addressId) {
    return this.db()
      .table(this.TABLE)
      .insert({ customer_id: customerId, address_id: addressId })
      .then(() => true);
  }

}
