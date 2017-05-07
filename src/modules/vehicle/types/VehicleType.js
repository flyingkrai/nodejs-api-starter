/* @flow */

import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import DateType from '../../shared/types/DateType';
import Node from '../../shared/types/Node';

export default new GraphQLObjectType({
  name: 'Vehicle',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    brand: {
      type: new GraphQLNonNull(GraphQLString),
    },
    model: {
      type: new GraphQLNonNull(GraphQLString),
    },
    plate: {
      type: new GraphQLNonNull(GraphQLString),
    },
    color: {
      type: GraphQLString,
    },
    fuel: {
      type: GraphQLString,
    },
    year: {
      type: new GraphQLNonNull(GraphQLString),
    },
    renavam: {
      type: GraphQLString,
    },
    chassi: {
      type: GraphQLString,
    },
    createdAt: {
      type: DateType,
      resolve: obj => obj.created_at,
    },
    updatedAt: {
      type: DateType,
      resolve: obj => obj.updated_at,
    },
  },

  interfaces: [
    Node.interface,
  ],
});
