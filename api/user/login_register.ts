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

  login = (email: string, password: string) => {
    return login(email, password);
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
    console.log(error);
  }
};

const login = async (email: string, password: string) => {
  const response = await customAxios.post('/auth/login', {
    email,
    password,
  });
  return response;
};
