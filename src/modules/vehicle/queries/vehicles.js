import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';

import Vehicle from '../models/Vehicle';
import VehicleType from '../types/VehicleType';

const articles = connectionDefinitions({ name: 'Vehicle', nodeType: VehicleType });

export default {
  type: articles.connectionType,
  description: 'Vehicles query',
  args: connectionArgs,
  resolve: (_, args) => connectionFromPromisedArray(Vehicle.find(), args),
};
