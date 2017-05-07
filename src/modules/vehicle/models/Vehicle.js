/**
 * Node.js API Starter Kit (https://reactstarter.com/nodejs)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import AbstractModel from '../../shared/models/AbstractModel';

export default class Vehicle extends AbstractModel {

  static TABLE = 'vehicles';

  static ID_KEY = 'id';
}
