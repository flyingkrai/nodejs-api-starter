import { GraphQLInputObjectType, GraphQLNonNull } from 'graphql';

export default (name, fields, description = '', nullable = true) => {
  const filter = new GraphQLInputObjectType({
    name,
    fields,
    description,
  });

  return {
    filter: {
      type: nullable ? filter : new GraphQLNonNull(filter),
    },
  };
};
