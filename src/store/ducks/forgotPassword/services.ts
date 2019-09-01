import { apiSet } from '../../../services/api';

export const forgotPassword = async (email: string) => {
  try {
    return await apiSet.post('/forgot-password', { email })
      .then(response => response.status === 200);
  } catch (error) {
    const message = error.response ? error.response.data.message : error.message;
    throw Error(message);
  }
};
