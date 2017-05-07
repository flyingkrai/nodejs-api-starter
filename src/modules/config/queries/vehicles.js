import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import _filter from 'lodash/filter';
import config from 'config';

import filterInputGenerator from '../../shared/helpers/filter-input-generator';
import VehicleBrandType from '../../shared/types/VehicleBrand';

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(VehicleBrandType))),
  description: 'List of vehicles',
  args: filterInputGenerator(
    'VehiclesFilterInput',
    {
      id: {
        type: GraphQLID,
        description: 'Filter brands by matching id',
      },
      name: {
        type: GraphQLString,
        description: 'Filter brands by matching name',
      },
    },
  ),
  resolve: (_, { filter = {} }) => {
    const vehicles = config.get('vehicles');

    if (filter.id) return _filter(vehicles, v => String(v.id) === filter.id);
    if (filter.name) {
      const regex = new RegExp(filter.name, 'i');
      return _filter(vehicles, v => regex.test(v.name));
    }

    return vehicles;
  },
};
