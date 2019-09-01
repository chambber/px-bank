import querystring from 'querystring';

import { apiIsis, apiSet } from '../../../services/api';
import { Customer } from '../../../models';
import { getUser } from '../../../services/auth';

export const create = async (customer: Customer) => {
  try {
    return await apiIsis
      .post('/onboarding', customer)
      .then(({ data }) => data.data);
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const existsCustomer = async (conditions: Record<string, any>) => {
  try {
    const query = querystring.stringify(conditions);
    const result = await apiIsis
      .get(`/exist-onboarding?${query}`)
      .then(response => response.status === 200);
    return result;
  } catch (error) {
    if (error.response && error.response.status === 404) return false;
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const deactivate = async () => {
  const loggedUser = getUser();

  if (loggedUser) {
    const url = `/customers/${loggedUser.id}`;
    const result = await apiSet.delete(url);
    return result.data;
  }
};
