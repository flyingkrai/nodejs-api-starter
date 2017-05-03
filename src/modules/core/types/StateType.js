import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';

export default new GraphQLObjectType({
  name: 'State',
  description: 'Country states and cities',
  fields: {
    short: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'State shorthand (eg.: SP)',
    },
    full: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'State full name (eg.: São Paulo)',
    },
    cities: {
      type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
      description: 'List of cities',
    },
  },
});
