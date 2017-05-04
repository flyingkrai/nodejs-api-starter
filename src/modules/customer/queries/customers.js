import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';

import Customer from '../models/Customer';
import CustomerType from '../types/CustomerType';

const articles = connectionDefinitions({ name: 'Customer', nodeType: CustomerType });

export default {
  type: articles.connectionType,
  description: 'Customers query',
  args: connectionArgs,
  resolve: (_, args) => connectionFromPromisedArray(Customer.find(), args),
};
