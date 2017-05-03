import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'ConfigStateFilterInput',
  fields: {
    state: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Filter states by it\'s shorthand name',
    },
  },
});
