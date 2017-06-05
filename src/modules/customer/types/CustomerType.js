/* @flow */

import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';

import DateType from '../../shared/types/DateType';
import Node from '../../shared/types/Node';
import AddressType from '../../address/types/AddressType';
import Address from '../../address/models/Address';

export default new GraphQLObjectType({
  name: 'Customer',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    cpf: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    cellphone: {
      type: GraphQLString,
    },
    company: {
      type: GraphQLString,
    },
    occupation: {
      type: GraphQLString,
    },
    address: {
      type: new GraphQLList(AddressType),
      resolve: obj => Address.findByCustomer(obj.id), // @TODO find address
    },
    memberSince: {
      type: DateType,
      resolve: obj => obj.created_at,
    },
  },

  interfaces: [
    Node.interface,
  ],
});
