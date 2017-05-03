import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import _find from 'lodash/find';
import config from 'config';

import StatesFilterInputType from '../types/inputs/StateFilterType';

export default {
  type: new GraphQLList(GraphQLString),
  description: 'List of Brazil states',
  args: {
    filter: {
      type: new GraphQLNonNull(StatesFilterInputType),
    },
  },
  resolve: (_, { filter }) =>
    (_find(config.get('states'), s => s.short === filter.state) || { cities: [] }).citites,
};
