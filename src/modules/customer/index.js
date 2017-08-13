import customers from './queries/customers';
import searchCustomers from './queries/search';
import addCustomer from './mutations/add';

export const queries = {
  customers,
  searchCustomers,
};

export const mutations = {
  addCustomer,
};
