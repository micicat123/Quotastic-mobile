import { number } from 'yup';
import customAxios from '../../config/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../../common/functions/user';

export class ManageQuoteStore {
  addQUote = (quote: string) => {
    try {
      return addQuote(quote);
    } catch (e) {
      return null;
    }
  };

  editQuote = (quote: string, quoteId: number) => {
    try {
      return editQuote(quote, quoteId);
    } catch (e) {
      return null;
    }
  };

  deleteQuote = (quoteId: number) => {
    try {
      return deleteQuote(quoteId);
    } catch (e) {
      return null;
    }
  };
}

const addQuote = async (quote: string) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    try {
      await customAxios.post(
        `/quote`,
        { quote: quote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      logout();
    }
  } else {
    return null;
  }
};

const editQuote = async (quote: string, quoteId: number) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    try {
      await customAxios.put(
        `quote/${quoteId}`,
        { quote: quote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      logout();
    }
  } else {
    return null;
  }
};

const deleteQuote = async (quoteId: number) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    try {
      await customAxios.delete(`quote/${quoteId}`, {
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
