import { GraphQLNonNull, GraphQLList } from 'graphql';
import config from 'config';

import StatesType from '../../shared/types/StateType';

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(StatesType))),
  description: 'List of Brazil states',
  resolve: () => config.get('states'),
};
