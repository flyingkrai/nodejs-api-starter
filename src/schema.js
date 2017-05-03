/**
 * Node.js API Starter Kit (https://reactstarter.com/nodejs)
 *
 * Copyright © 2016-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* @flow */

import { GraphQLSchema, GraphQLObjectType } from 'graphql';

import Node from './types/Node';
import ViewerType from './types/ViewerType';
import ConfigType from './modules/core/types/ConfigType';

// In order to make it work with Relay 0.x, all the top-level
// fields are placed inside the "viewer" field
export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      node: Node.nodeField,
      nodes: Node.nodesField,
      viewer: {
        type: ViewerType,
        resolve: () => Object.create(null),
      },
      config: {
        type: ConfigType,
        resolve: () => Object.create(null),
      },
    },
  }),
});
