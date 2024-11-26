import axios from 'axios';

export const getCurrencyRate = async (currency: string): Promise<number> => {
  const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currency}`);
  return response.data.rates.BRL;
};
