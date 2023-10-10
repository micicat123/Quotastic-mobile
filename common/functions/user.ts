import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

const checkForUser = async (setIsLoggedIn: Function) => {
  const userId = await AsyncStorage.getItem('userId');
  if (userId) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
};

export { checkForUser };
