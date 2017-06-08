import { GraphQLNonNull, GraphQLString } from 'graphql';

import AddressType from '../types/AddressType';
import AddressInputType from '../types/inputs/AddressInputType';
import Address from '../models/Address';

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
    new Address(data)
      .save()
      .then(address => address
        .customers()
        .attach(customerId)
        .then(() => address.toJSON())),
};
