/* @flow */

import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import Node from '../../shared/types/Node';

export default new GraphQLObjectType({
  name: 'SalesmanType',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },

  interfaces: [
    Node.interface,
  ],
});
