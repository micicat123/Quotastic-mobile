import { object, string } from 'yup';

const editInfoSchema = object().shape({
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
});

interface editInfoValues {
  firstName: string;
  lastName: string;
  email: string;
}

export { editInfoSchema, editInfoValues };
