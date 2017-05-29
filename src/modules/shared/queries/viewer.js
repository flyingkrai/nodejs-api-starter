/* @flow */

import ViewerType from '../types/Viewer/ViewerQueryType';

export default {
  type: ViewerType,
  resolve: (root, args, { user }) => {
    // @TODO check user
    console.log(user);

    return Object.create(null);
  },
};
