/* @flow */

import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import config from 'config';

import DateType from '../../shared/types/DateType';
import Node from '../../shared/types/Node';
import SalesmanTypeType from './SalesmanTypeType';

export default new GraphQLObjectType({
  name: 'Salesman',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    type: {
      type: new GraphQLNonNull(SalesmanTypeType),
      resolve: obj => config.get(`salesmen.types.${obj.type_id}`),
    },
    cellphone: {
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
