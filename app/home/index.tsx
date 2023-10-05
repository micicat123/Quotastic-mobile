import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';
import MostLikedQuotes from '../../components/home_page/mostLikedQuotes';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import RandomQuote from '../../components/home_page/randomQuote';
import MostRecentQuotes from '../../components/home_page/mostRecentQuotes';

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchAsyncStorageValues = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
        setIsLoggedIn(false);
      }
    };

    fetchAsyncStorageValues();
  }, []);

  if (isLoggedIn) {
    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginLeft: 30, marginRight: 30 }}>
          <RandomQuote />
          <MostLikedQuotes />
          <MostRecentQuotes />
        </View>
      </ScrollView>
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
            <Link href='/login' style={[customStyles.buttonText]}>
              <Text>Sign up</Text>
            </Link>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/hero.png')}
          style={{ width: '100%', resizeMode: 'contain', marginTop: 30 }}
        />

        <Text style={[customStyles.h4, { textAlign: 'center' }]}>
          Explore the{'\n'} world of {'\n'}fantastic quotes
        </Text>

        <MostLikedQuotes />
      </View>
    </ScrollView>
  );
}
