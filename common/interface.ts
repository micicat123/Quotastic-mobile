import { Quote } from '../models/quote';
import { Text, View } from 'react-native';

interface LoggedInProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

export default LoggedInProps;
