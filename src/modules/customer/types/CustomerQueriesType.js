import { GraphQLObjectType } from 'graphql';

import find from '../queries/find';
import list from '../queries/list';

const fields = {
  find,
  list,
};

export default new GraphQLObjectType({
  name: 'CustomerQueries',
  description: 'Root queries for customer',
  fields,
});
