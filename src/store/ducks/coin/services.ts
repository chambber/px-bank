import { apiOsiris } from '../../../services/api';

export const getCoinFee = async (coinId: number) => {
  const url = `/coins/${coinId}/fee`;
  const result = await apiOsiris.get(url);
  return result.data.fee;
};
