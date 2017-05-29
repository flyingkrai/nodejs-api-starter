import { GraphQLNonNull, GraphQLString } from 'graphql';
import _find from 'lodash/find';
import config from 'config';

import StateType from '../../shared/types/StateCity/StateType';

export default {
  type: StateType,
  description: 'List of Brazil states',
  args: {
    state: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'State shortname (eg.: SP)',
    },
  },
  resolve: (_, { state }) => {
    const stateFilter = new RegExp(state, 'i');

    return _find(config.get('states'), s => stateFilter.test(s.short));
  },
};
