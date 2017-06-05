/* @flow */

import ViewerType from '../types/Viewer/ViewerQueryType';

export default {
  type: ViewerType,
  resolve: (root, args, { user }) => {
    // @TODO check user
    if (user) console.log('current user: ', user);

    return Object.create(null);
  },
};
