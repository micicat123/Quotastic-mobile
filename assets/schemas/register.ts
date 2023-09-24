import { object, ref, string } from 'yup';

const registerSchema = object().shape({
  firstName: string()
    .min(2, 'First name needs to be at least 2 characters long')
    .max(30, 'First name needs to be shorter than 30 characters')
    .required('Enter your first name'),
  lastName: string()
    .min(2, 'Last name needs to be at least 2 characters long')
    .max(30, 'Last name needs to be shorter than 30 characters')
    .required('Enter your last name'),
  email: string()
    .email('Invalid email format.')
    .required('Enter your email address'),
  password: string()
    .max(25, 'Password needs to be shorter than 25 characters')
    .required('Enter a password.')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/,
      'Please create a stronger password'
    ),
  passwordConfirm: string()
    .required('Please enter a password again.')
    .oneOf([ref('password')], 'Passwords do not match'),
});

interface registerValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;
}

export { registerSchema, registerValues };
