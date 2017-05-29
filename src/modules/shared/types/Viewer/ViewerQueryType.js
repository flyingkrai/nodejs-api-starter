/* @flow */

import { GraphQLObjectType } from 'graphql';
import { connectionArgs, connectionDefinitions, connectionFromPromisedArray } from 'graphql-relay';

import Article from '../../models/Article';
import ArticleType from '../ArticleType';
import UserType from '../../../user/types/UserType';
import customers from '../../../customer/queries/customers';
import salesmen from '../../../salesman/queries/salesmen';

const articles = connectionDefinitions({ name: 'Article', nodeType: ArticleType });

export default new GraphQLObjectType({
  name: 'QueryViewer',
  fields: {
    me: {
      type: UserType,
      resolve(root, args, { user }) {
        return user;
      },
    },
    articles: {
      type: articles.connectionType,
      description: 'Featured articles',
      args: connectionArgs,
      resolve: (_, args) => connectionFromPromisedArray(Article.find(), args),
    },
    customers,
    salesmen,
  },
});
