import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
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

const logout = async () => {
  await AsyncStorage.removeItem('jwt');
  await AsyncStorage.removeItem('firstName');
  await AsyncStorage.removeItem('lastName');
  await AsyncStorage.removeItem('userId');
  await AsyncStorage.removeItem('email');
  router.replace('/');
};

export { checkForUser, isQuoteCreatedByCurrentUser, logout };
