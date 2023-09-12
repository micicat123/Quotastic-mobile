import { Quote } from '../models/quote';
import { Text, View } from 'react-native';

interface LoggedInProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const createCardFromQuote = (quote: Quote): JSX.Element => (
  <View style={{ flexDirection: 'row' }}>
    <View>
      <Text>up arrow</Text>
      <Text>{quote.upvotes}</Text>
      <Text>down arrow</Text>
    </View>
    <View>
      <Text>{quote.quote}</Text>
      <View>
        <Text>users picture</Text>
        <Text>
          {quote.user.first_name} {quote.user.last_name}
        </Text>
      </View>
    </View>
  </View>
);
export default LoggedInProps;
