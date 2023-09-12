import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoggedInProps from '../../common/functions';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../config/theme.config';

const Header: React.FC<LoggedInProps> = ({ isLoggedIn, setIsLoggedIn }) => {
  if (!isLoggedIn) {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoAlone}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
            <Icon
              name={'add-circle-outline'}
              size={40}
              color={Theme.lightColors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 30,
    marginRight: 30,
  },
  logoAlone: { marginTop: 10, marginLeft: 'auto', marginRight: 'auto' },
  logo: { marginTop: 10 },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Header;
