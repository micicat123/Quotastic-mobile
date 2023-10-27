import { object, string } from 'yup';

const manageQuoteSchema = object().shape({
  quote: string()
    .min(5, 'Quote needs to be at least 5 characters long')
    .max(116, 'Quote needs to be shorter than 116 characters')
    .required('Enter your quote'),
});

interface manageQuoteValues {
  quote: string;
}

export { manageQuoteSchema, manageQuoteValues };
