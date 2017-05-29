/* @flow */

import { GraphQLObjectType } from 'graphql';

import viewer from '../../mutations/viewer';

// In order to make it work with Relay 0.x, all the top-level
// fields are placed inside the "viewer" field
export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    viewer,
  },
});
