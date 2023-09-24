import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '../../config/axios.config';

export class LoginRegisterStore {
  register = (
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    passwordConfirm: string
  ) => {
    return register(email, firstName, lastName, password, passwordConfirm);
  };

  postUserPicture = (formData: any, email: string) => {
    return postUserPicture(formData, email);
  };
}

const register = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  passwordConfirm: string
) => {
  const response = await customAxios.post('/user', {
    email,
    first_name: firstName,
    last_name: lastName,
    password,
    password_confirm: passwordConfirm,
  });
  return response;
};

const postUserPicture = async (formData: any, email: string) => {
  try {
    return await customAxios.post(`/uploads/${email}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error(
        'Server Error:',
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No Response from Server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Request Error:', error.message);
    }
  }
};
