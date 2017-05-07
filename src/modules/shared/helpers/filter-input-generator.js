import { GraphQLInputObjectType } from 'graphql';

export default (name, fields, description = '') => ({
  filter: {
    type: new GraphQLInputObjectType({
      name,
      fields,
      description,
    }),
  },
});
