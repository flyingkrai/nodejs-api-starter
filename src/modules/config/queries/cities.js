import { GraphQLNonNull, GraphQLList, GraphQLString } from 'graphql';
import _find from 'lodash/find';
import _filter from 'lodash/filter';
import config from 'config';

import filterInputGenerator from '../../shared/helpers/filter-input-generator';

export default {
  type: new GraphQLList(GraphQLString),
  description: 'List of Brazil states',
  args: filterInputGenerator('ConfigCitiesFilterInput', {
    state: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Filter cities by state shorthand name',
    },
    city: {
      type: GraphQLString,
      description: 'Filter cities',
    },
  }, 'Filter cities', false),
  resolve: (_, { filter }) => {
    const stateFilter = new RegExp(filter.state, 'i');
    const cityFilter = filter.city ? new RegExp(filter.city, 'i') : null;
    /** @type {{ cities }} state */
    const state = _find(config.get('states'), s => stateFilter.test(s.short));
    const cities = (state || { cities: [] }).cities;

    return !cityFilter ? cities : _filter(cities, c => cityFilter.test(c));
  },
};
