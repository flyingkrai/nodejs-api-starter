import { GraphQLNonNull, GraphQLID, GraphQLString, GraphQLList } from 'graphql';

import filterInputGenerator from '../../shared/helpers/filter-input-generator';
import CustomerType from '../types/CustomerType';
import Customer from '../models/Customer';

export default {
  type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(CustomerType))),
  description: 'Search for customer',
  args: filterInputGenerator(
    'CustomerSearchFilterInput',
    {
      document: {
        type: GraphQLID,
        description: 'Search by document',
      },
      name: {
        type: GraphQLString,
        description: 'Search by name',
      },
    },
  ),
  resolve: (_, { filter = {} }) => {
    if (!filter || (!filter.document && !filter.name)) {
      return Promise.reject(new Error('Not enough parameters'));
    }

    return Customer.findAllByDocumentOrName(filter.document, filter.name);
  },
};
