/* @flow */

import { GraphQLObjectType } from 'graphql';

import Node from '../Node';
import viewer from '../../queries/viewer';
import ConfigType from '../../../config/types/ConfigType';

// In order to make it work with Relay 0.x, all the top-level
// fields are placed inside the "viewer" field
export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: Node.nodeField,
    nodes: Node.nodesField,
    viewer,
    config: {
      type: ConfigType,
      resolve: () => Object.create(null),
    },
  },
});
