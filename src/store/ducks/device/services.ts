import { apiSet, apiIsis } from '../../../services/api';
import { DeviceInfo } from '../../../models/DeviceInfo';

export const createDevice = async (device: DeviceInfo) => {
  try {
    return await apiSet.post('/device', device)
      .then(({ data }) => {
          return data;        
      });
  } catch (error) {

    throw error.response;
  }
};

