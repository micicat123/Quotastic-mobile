import AsyncStorage from '@react-native-async-storage/async-storage';

const checkForUser = async (setIsLoggedIn: Function) => {
  const userId = await AsyncStorage.getItem('userId');
  if (userId) {
    setIsLoggedIn(true);
  } else {
    setIsLoggedIn(false);
  }
};

export { checkForUser };
