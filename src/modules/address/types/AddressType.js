/* @flow */

import { GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'Address',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    zipcode: {
      type: new GraphQLNonNull(GraphQLString),
    },
    place: {
      type: new GraphQLNonNull(GraphQLString),
    },
    number: {
      type: new GraphQLNonNull(GraphQLString),
    },
    complement: {
      type: GraphQLString,
    },
    neighbor: {
      type: new GraphQLNonNull(GraphQLString),
    },
    city: {
      type: new GraphQLNonNull(GraphQLString),
    },
    state: {
      type: new GraphQLNonNull(GraphQLString),
    },
    fullAddress: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: obj => [
        obj.place,
        ', ',
        obj.number,
        (obj.complement ? `, ${obj.complement}` : ''),
        ' - ',
        obj.neighbor,
        ', ',
        obj.city,
        ' - ',
        obj.state,
      ].join(''),
    },
  },
});
