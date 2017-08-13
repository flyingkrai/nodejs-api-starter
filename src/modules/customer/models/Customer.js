/* @flow */

import AbstractModel from '../../shared/models/AbstractModel';
import Address from '../../address/models/Address';

export default class Customer extends AbstractModel {
  static tableName = 'customers';

  get tableName() { return 'customers'; }

  get uuid() { return true; }

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

  /**
   *
   * @static
   * @param {String} document
   * @param {String} name
   * @returns {Promise}
   */
  static findAllByDocumentOrName(document, name) {
    return this
      .query((qb) => {
        if (document) {
          qb.where('document', 'LIKE', `%${document}%`);
          if (name) {
            qb.orWhere('name', 'LIKE', `%${name}%`);
          }
        } else if (name) {
          qb.where('name', 'LIKE', `%${name}%`);
        }
      })
      .fetchAllCache({ serial: this.makeSearchKey(document, name) })
      .then(r => r.toJSON());
  }
}
