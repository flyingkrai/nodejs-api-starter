/* @flow */

import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import DateType from '../../../types/DateType';

export default new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    cpf: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    memberSince: {
      type: DateType,
    },
  },
});
