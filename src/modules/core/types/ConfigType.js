import { GraphQLObjectType } from 'graphql';

import state from '../queries/state';
import states from '../queries/states';
import cities from '../queries/cities';
import vehicles from '../queries/vehicles';

const fields = {
  state,
  states,
  cities,
  vehicles,
};

export default new GraphQLObjectType({
  name: 'Config',
  fields,
});
