import { GraphQLInt } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';

import Vehicle from '../models/Vehicle';
import VehicleType from '../types/VehicleType';

const articles = connectionDefinitions({
  name: 'Vehicle',
  nodeType: VehicleType,
  connectionFields: {
    totalCount: {
      type: GraphQLInt,
      resolve: () => Vehicle.find().then(res => (Array.isArray(res) ? res : []).length),
    },
  },
});

export default {
  type: articles.connectionType,
  description: 'Vehicles query',
  args: connectionArgs,
  resolve: (_, args) => connectionFromPromisedArray(Vehicle.find(), args),
};
