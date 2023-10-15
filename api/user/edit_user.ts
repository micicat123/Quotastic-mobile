import { number } from 'yup';
import customAxios from '../../config/axios.config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class UpdateUserStore {
  updateUserInfo = (firstName: string, lastName: string, email: string) => {
    try {
      return updateUserInfo(firstName, lastName, email);
    } catch (e) {
      return null;
    }
  };
}

const updateUserInfo = async (
  firstName: string,
  lastName: string,
  email: string
) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    await customAxios.put(
      `/user/update-info`,
      { first_name: firstName, last_name: lastName, email: email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } else {
    return null;
  }
};
