import { apiSet, apiIsis } from '../../../services/api';

import { Login } from '../../../models/Login';
import { OnBoarding } from './types';

export const login = async (user: Login) => {
  try {
    return await apiSet.post('/login', user)
      .then(({ data }) => {
        if(data.data){         
          return data.data;
        }else{
          return data;
        }
      });
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) return null;
      throw Error(error.response.data.message);
    }
    throw Error(error.message);
  }
};

export const existCustomer = async (email: string, password: string) => {
  try {
    return await apiIsis.get(`/exist-onboarding?email=${email}&password=${password}`)
      .then(({ data }) => data.data);
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    throw Error(message);
  }
};

export const verify2FA = async (
  user: string,
  token: string,
  authorization: string,
): Promise<string | boolean> => {
  try {
    return await apiSet.get(`/customers/${user}/2fa?token=${token}`, {
      headers: { Authorization: `Bearer ${authorization}` },
    })
      .then(({ data }) => (data.data ? data.data : true));
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    throw Error(message);
  }
};

export const forgotPassword = async (email: string) => {
  try {
    return await apiSet.post('/forgot-password', { email })
      .then(response => response.status === 200);
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    throw Error(message);
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    return await apiSet.post(`/reset-password/${token}`, { password })
      .then(response => response.status === 200);
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    throw Error(message);
  }
};

export const sendConfirmation = async (onboarding: OnBoarding) => {
  try {
    return await apiIsis.post(`/onboarding/${onboarding.id}/emails/${onboarding.id}/sendVerification`)
      .then(response => response.status === 204);
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    throw Error(message);
  }
};
