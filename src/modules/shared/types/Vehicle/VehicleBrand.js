import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';
import _filter from 'lodash/filter';

import filterInputGenerator from '../../helpers/filter-input-generator';
import VehicleModel from './VehicleModel';

export default new GraphQLObjectType({
  name: 'VehicleBrand',
  description: 'Vehicle Brands',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Brand ID',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Brand Name',
    },
    models: {
      type: new GraphQLNonNull(new GraphQLList(VehicleModel)),
      description: 'List of models',
      args: filterInputGenerator(
        'VehicleModelFilterInput',
        {
          id: {
            type: GraphQLID,
            description: 'Filter models by matching id',
          },
          name: {
            type: GraphQLString,
            description: 'Filter models by matching name',
          },
        },
      ),
      resolve: (obj, { filter = {} }) => {
        if (filter.id) return _filter(obj.models, m => String(m.id) === filter.id);
        if (filter.name) {
          const regex = new RegExp(filter.name, 'i');
          return _filter(obj.models, m => regex.test(m.name));
        }

        return obj.models;
      },
    },
  },
});
