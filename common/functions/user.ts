import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { Quote } from '../../models/quote';

const checkForUser = async (setIsLoggedIn: Function) => {
  const userId = await AsyncStorage.getItem('userId');
  if (userId) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
};

const isQuoteCreatedByCurrentUser = async (quote: Quote) => {
  const loggedUserId = await AsyncStorage.getItem('userId');
  const idFromQuote = quote.user.user_id;
  if (Number(loggedUserId) == idFromQuote) {
    return true;
  } else {
    return false;
  }
};

export { checkForUser, isQuoteCreatedByCurrentUser };
