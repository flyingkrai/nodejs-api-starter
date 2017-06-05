import { GraphQLNonNull, GraphQLString } from 'graphql';

import AddressType from '../types/AddressType';
import AddressInputType from '../types/inputs/AddressInputType';
import Address from '../models/Address';
import Customer from '../../customer/models/Customer';

export default {
  type: AddressType,
  description: 'Adds a new address',
  args: {
    // @TODO should this be generic (customer, company, none)?
    customerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    data: {
      type: new GraphQLNonNull(AddressInputType),
      description: 'Data field',
    },
  },
  resolve: (_, { data, customerId }) =>
    Address
    // creates the address
      .create(data)
      .then(address =>
        Address
        // adds the address to customer
          .addToCustomer(customerId, address.id)
          // finally returns the created address
          .then(() => address)),
};
