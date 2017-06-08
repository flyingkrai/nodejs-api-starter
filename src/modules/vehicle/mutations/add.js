import { GraphQLNonNull, GraphQLString } from 'graphql';

import VehicleType from '../types/VehicleType';
import VehicleInputType from '../types/inputs/VehicleInputType';
import Vehicle from '../models/Vehicle';

export default {
  type: VehicleType,
  description: 'Adds a new address',
  args: {
    // @TODO should this be generic (customer, company, none)?
    customerId: {
      type: new GraphQLNonNull(GraphQLString),
    },
    data: {
      type: new GraphQLNonNull(VehicleInputType),
      description: 'Data field',
    },
  },
  resolve: (_, { data, customerId }) =>
    Vehicle
    // creates the address
      .create(data)
      .then(address =>
        Vehicle
        // adds the address to customer
          .addToCustomer(customerId, address.id)
          // finally returns the created address
          .then(() => address)),
};
