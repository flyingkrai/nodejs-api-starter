import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'VehicleModel',
  description: 'Vehicle model',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'Model ID',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Model Name',
    },
  },
});
