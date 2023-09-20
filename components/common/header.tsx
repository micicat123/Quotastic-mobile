import {
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import LoggedInProps from '../../common/interface';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../config/theme.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then((user) => {
        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.error('Error checking user:', error);
        setIsLoggedIn(false);
      });
  }, []);

  if (isLoggedIn) {
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
  } else {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => console.log('pressed')}>
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
  }
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
