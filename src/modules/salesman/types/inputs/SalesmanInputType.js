/* @flow */

import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'SalesmanDataInputType',
  description: 'Salesman\'s input data',
  fields: {
    code: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    cellphone: {
      type: GraphQLString,
    },
    type: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
