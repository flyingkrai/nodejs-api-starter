import { GraphQLObjectType } from 'graphql';

import state from '../queries/state';
import states from '../queries/states';
import cities from '../queries/cities';

const fields = {
  state,
  states,
  cities,
};

export default new GraphQLObjectType({
  name: 'Config',
  fields,
});
