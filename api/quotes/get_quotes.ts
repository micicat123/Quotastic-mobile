import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '../../config/axios.config';
import { logout } from '../../common/functions/user';

export class GetQuotesStore {
  mostLikedQuotes = (page: number) => {
    try {
      return mostLikedQuotes(page);
    } catch (e) {
      return null;
    }
  };

  mostRecentQuotes = (page: number) => {
    try {
      return mostRecentQuotes(page);
    } catch (e) {
      return null;
    }
  };

  randomQuote = () => {
    try {
      return randomQuote();
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

const mostRecentQuotes = async (page: number) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    try {
      return await customAxios.get(`/quote/most-recent/${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      logout();
    }
  } else {
    return null;
  }
};

const randomQuote = async () => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    try {
      return await customAxios.get(`/quote/random`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      logout();
    }
  } else {
    return null;
  }
};
