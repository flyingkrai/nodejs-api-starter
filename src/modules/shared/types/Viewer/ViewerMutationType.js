/* @flow */

import { GraphQLObjectType } from 'graphql';

import { mutations as customerMutations } from '../../../customer';
import addAddress from '../../../address/mutations/add';

export default new GraphQLObjectType({
  name: 'MutationViewer',
  fields: {
    ...customerMutations,
    addAddress,
  },
});
