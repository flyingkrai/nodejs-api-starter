import { GraphQLInt } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';

import Customer from '../models/Customer';
import CustomerType from '../types/CustomerType';

const articles = connectionDefinitions({
  name: 'Customer',
  nodeType: CustomerType,
  connectionFields: {
    totalCount: {
      type: GraphQLInt,
      resolve: () => Customer.find().then(res => (Array.isArray(res) ? res : []).length),
    },
  },
});

export default {
  type: articles.connectionType,
  description: 'Customers query',
  args: connectionArgs,
  resolve: (_, args) => connectionFromPromisedArray(Customer.find(), args),
};
