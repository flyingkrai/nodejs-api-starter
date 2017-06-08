import { GraphQLNonNull } from 'graphql';

import CustomerType from '../types/CustomerType';
import CustomerInputType from '../types/inputs/CustomerInputType';
import Customer from '../models/Customer';

export default {
  type: CustomerType,
  description: 'Adds a new customer',
  args: {
    data: {
      type: new GraphQLNonNull(CustomerInputType),
      description: 'Data field',
    },
  },
  resolve: (_, { data }) => new Customer(data).save().then(r => r.toJSON()),
};
