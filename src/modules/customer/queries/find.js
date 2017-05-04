import { GraphQLNonNull, GraphQLString } from 'graphql';

import CustomerType from '../types/CustomerType';
import Customer from '../models/Customer';

export default {
  type: CustomerType,
  description: 'Finds a single customer',
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Customer ID',
    },
  },
  resolve: (_, { id }) => Customer.findOneById(id),
};
