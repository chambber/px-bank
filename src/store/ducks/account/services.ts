import { apiSet, apiOsiris } from '../../../services/api';

import { Token } from '../../../models/Token';
import { Account, UpdatePassword } from '../../../models/Account';

export const get = async (token: Token) => {
  try {
    const { data } = await apiSet.get(`/customers/${token.id}`);
    return data as Account;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const insert2FA = async (
  user: string,
  token: string,
  secret: string,
) => {
  try {
    await apiSet.post(`/customers/${user}/2fa?token=${token}`, { secret });
    return true;
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const updatePassword = async (updatePassword: UpdatePassword) => {
  try {
    return await apiSet
      .put('/update-password', updatePassword)
      .then(({ data }) => {
        console.log('data service:', data);
        return data.data;
      });
  } catch (error) {
    console.log('error service:', error);
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const validateTerms = async (data: boolean) => {
  try {
    return await apiSet
      .put('/validate-terms', data)
      .then(({ data }) => data);
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const getActivities = async (customer: string) => {
  try {
    return await apiSet
      .get(`/customers/${customer}/account-activity`)
      .then(({ data }) => data.map((item: Record<string, any>) => ({
        ...item,
        id: item._id, // eslint-disable-line
      })));
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const getDevices = async (customer: string) => {
  try {
    return await apiSet
      .get(`/customers/${customer}/devices-activity`)
      .then(({ data }) => data.map((item: Record<string, any>) => ({
        ...item,
        id: item._id, // eslint-disable-line
      })));
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const deleteDevices = async (customer: string, deviceid: string) => {
  try {
    return await apiSet
      .delete(`customers/${customer}/device/${deviceid}`);
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
};

export const uploadPhoto = async (customer: string, image: string) => {
  try {
    return await apiSet
      .post(`customers/${customer}/uploadPhoto`, { base64: image });
  } catch (error) {
    const message = error.response
      ? error.response.data.message
      : error.message;
    throw Error(message);
  }
}
