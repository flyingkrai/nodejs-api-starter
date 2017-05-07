import { GraphQLNonNull } from 'graphql';
import _find from 'lodash/find';
import config from 'config';

import StateType from '../../shared/types/StateType';
import StatesFilterInputType from '../types/inputs/StateFilterType';

export default {
  type: StateType,
  description: 'List of Brazil states',
  args: {
    filter: {
      type: new GraphQLNonNull(StatesFilterInputType),
    },
  },
  resolve: (_, { filter }) => _find(config.get('states'), s => s.short === filter.state),
};
