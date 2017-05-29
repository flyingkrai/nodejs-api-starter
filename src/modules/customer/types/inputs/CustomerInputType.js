/* @flow */

import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

import AddressInputType from '../../../address/types/inputs/AddressInputType';

export default new GraphQLInputObjectType({
  name: 'CustomerDataInputType',
  description: 'Customer\'s input data',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    company: {
      type: GraphQLString,
    },
    cpf: {
      type: new GraphQLNonNull(GraphQLString),
    },
    rg: {
      type: new GraphQLNonNull(GraphQLString),
    },
    phone: {
      type: GraphQLString,
    },
    cellphone: {
      type: GraphQLString,
    },
    birthdate: { // @TODO create DateInputType
      type: GraphQLString,
    },
    address: {
      type: AddressInputType,
    },
  },
});
