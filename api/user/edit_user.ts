import { logout } from '../../common/functions/user';
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

  updateUserPassword = (
    oldPassword: string,
    newPassword: string,
    newPasswordConfirm: string
  ) => {
    try {
      return updateUserPassword(oldPassword, newPassword, newPasswordConfirm);
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
    try {
      await customAxios.put(
        `/user/update-info`,
        { first_name: firstName, last_name: lastName, email: email },
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

const updateUserPassword = async (
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string
) => {
  const token = await AsyncStorage.getItem('jwt');
  if (token) {
    try {
      await customAxios.put(
        `/user/update-password`,
        {
          old_password: oldPassword,
          password: newPassword,
          password_confirm: newPasswordConfirm,
        },
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
