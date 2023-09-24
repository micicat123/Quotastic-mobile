import { object, string } from 'yup';

const loginSchema = object().shape({
  email: string()
    .email('Invalid email format.')
    .required('Enter your email address'),
  password: string().required('Enter a password.'),
});

interface loginValues {
  email: string;
  password: string;
}

export { loginSchema, loginValues };
