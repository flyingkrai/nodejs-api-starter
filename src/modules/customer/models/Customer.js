/* @flow */

import AbstractModel from '../../shared/models/AbstractModel';
import Address from '../../address/models/Address';

export default class Customer extends AbstractModel {
  static tableName = 'customers';
  get tableName() { return 'customers'; }

  /**
   * Defines address relation
   *
   * @returns {Collection}
   */
  address() {
    return this.belongsToMany(Address, 'customer_address');
  }

  /**
   * Loads all addresses for current customer
   *
   * @returns {Promise}
   */
  loadAddress() {
    return this
      .related('address')
      .fetchCache({ serial: `${this.id}:${Address.tableName}` });
  }
}
