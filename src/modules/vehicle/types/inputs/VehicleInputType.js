/* @flow */

import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'AddressDataInputType',
  description: 'Address input data',
  fields: {
    zipcode: {
      type: new GraphQLNonNull(GraphQLString),
    },
    place: {
      type: new GraphQLNonNull(GraphQLString),
    },
    number: {
      type: new GraphQLNonNull(GraphQLString),
    },
    complement: {
      type: GraphQLString,
    },
    neighbor: {
      type: new GraphQLNonNull(GraphQLString),
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
    },
    state: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});
