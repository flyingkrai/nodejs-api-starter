/* @flow */

import AbstractModel from '../../shared/models/AbstractModel';

export default class Address extends AbstractModel {
  static tableName = 'address';
  get tableName() { return 'vehicles'; }
}
