/* @flow */

import AbstractModel from '../../shared/models/AbstractModel';
import Customer from '../../customer/models/Customer';

export default class Address extends AbstractModel {
  static tableName = 'address';
  get tableName() { return 'address'; }

  static uuid = true;
  get uuid() { return true; }

  /**
   * Defines address relation
   *
   * @returns {Collection}
   */
  customers() {
    return this.belongsToMany(Customer, 'customer_address');
  }
}
