/* @flow */

import { GraphQLSchema } from 'graphql';

import QueryType from './modules/shared/types/Viewer/QueryType';
import MutationType from './modules/shared/types/Viewer/MutationType';

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
