import { RatesTypes } from './types';

export const setRate = (payload: string) => ({
  type: RatesTypes.SET,
  payload,
});
