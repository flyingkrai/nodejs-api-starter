/* @flow */

import { GraphQLObjectType } from 'graphql';

import addCustomer from '../../../customer/mutations/add';
import addAddress from '../../../address/mutations/add';

export default new GraphQLObjectType({
  name: 'MutationViewer',
  fields: {
    addCustomer,
    addAddress,
  },
});
