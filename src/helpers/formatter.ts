import Big from 'big.js';

export const formatStringToCurrency = (str: string, places: number) => {
  const formattedStr = new Big(str);
  return formattedStr.toFixed(places).replace('.', ',');
};
