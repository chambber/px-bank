import { apiOsiris } from '../../../services/api';

interface ExchangeRateResponse {
  rates: any;
}

export const getExchangeRate = async (currencies: string[]) => {
  const params = currencies.map(c => `currency=${c}`).join('&');
  const url = `/rates?${params}`;
  const result = await apiOsiris.get<ExchangeRateResponse>(url);
  return result.data.rates;
};
