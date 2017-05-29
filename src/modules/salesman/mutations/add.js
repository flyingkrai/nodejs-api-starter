import { GraphQLNonNull } from 'graphql';

import SalesmanType from '../types/SalesmanType';
import SalesmanInputType from '../types/inputs/SalesmanInputType';
import Salesman from '../models/Salesman';

export default {
  type: SalesmanType,
  description: 'Adds a new salesman',
  args: {
    data: {
      type: new GraphQLNonNull(SalesmanInputType),
      description: 'Data field',
    },
  },
  resolve: (_, { data }) => Salesman.create(data),
};
