import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';

import Salesman from '../models/Salesman';
import SalesmanType from '../types/SalesmanType';

const articles = connectionDefinitions({ name: 'Salesman', nodeType: SalesmanType });

export default {
  type: articles.connectionType,
  description: 'Salesmen query',
  args: connectionArgs,
  resolve: (_, args) => connectionFromPromisedArray(Salesman.find(), args),
};
