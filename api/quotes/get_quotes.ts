import { AxiosResponse } from 'axios';
import customAxios from '../../config/axios.config';
import { Quote } from '../../models/quote';

export class GetQuotesStore {
  mostLikedQuotes = (page: number) => {
    try {
      return mostLikedQuotes(page);
    } catch (e) {
      return null;
    }
  };
}

const mostLikedQuotes = async (page: number): Promise<any> => {
  try {
    const response = await customAxios.get(`quote/most-upvoted/${page}`);
    return response;
  } catch (error) {
    throw error;
  }
};
