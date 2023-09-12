import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LoggedInProps from '../../common/functions';
import { Theme, customStyles } from '../../config/theme.config';
import MostLikedQuotes from '../../components/home_page/mostLikedQuotes';

export default function HomeScreen({
  isLoggedIn,
  setIsLoggedIn,
}: LoggedInProps) {
  if (isLoggedIn) {
    return (
      <View>
        <Text>Logged in</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ marginLeft: 30, marginRight: 30 }}>
        <View>
          <Text style={customStyles.h1}>
            Welcome {'\n'}to{' '}
            <Text style={{ color: Theme.lightColors.primary }}>Quotastic</Text>
          </Text>
          <Text style={[customStyles.h5, { marginTop: 18, marginBottom: 32 }]}>
            Quotastic is free online platform for you to explore the quips,
            quotes, and proverbs. Sign up and express yourself.
          </Text>
          <TouchableOpacity style={[customStyles.filledButton, { width: 137 }]}>
            <Text style={[customStyles.buttonText, customStyles.body]}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/hero.png')}
          style={{ width: '100%', resizeMode: 'contain', marginTop: 30 }}
        />

        <Text style={[customStyles.h4, { textAlign: 'center' }]}>
          Explore the{'\n'} world of {'\n'}fantastic quotes
        </Text>

        <MostLikedQuotes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      </View>
    </ScrollView>
  );
}
