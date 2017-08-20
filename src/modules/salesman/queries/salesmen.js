import { GraphQLInt } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';

import Salesman from '../models/Salesman';
import SalesmanType from '../types/SalesmanType';

const articles = connectionDefinitions({
  name: 'Salesman',
  nodeType: SalesmanType,
  connectionFields: {
    totalCount: {
      type: GraphQLInt,
      resolve: () => Salesman.find().then(res => (Array.isArray(res) ? res : []).length),
    },
  },
});

export default {
  type: articles.connectionType,
  description: 'Salesmen query',
  args: connectionArgs,
  resolve: (_, args) => connectionFromPromisedArray(Salesman.find(), args),
};
