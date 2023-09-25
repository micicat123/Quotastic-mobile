import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Quote } from '../../models/quote';
import { GetQuotesStore } from '../../api/quotes/get_quotes';
import CreateCardFromQuote from '../common/CreateCardFromQuote';
import { Theme, customStyles } from '../../config/theme.config';
import { GetUserStore } from '../../api/user/get_user';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RandomQuote = () => {
  const [quote, setQuote] = useState<Quote>();
  const [picture, setPicture] = useState<any>();
  const [userVotes, setUserVotes] = useState([]);
  const getQuotesStore = new GetQuotesStore();
  const getUserStore = new GetUserStore();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      //get quotes
      const fetchedQuote: any = await getQuotesStore.randomQuote();
      setQuote(fetchedQuote.data);

      //get pictures

      const picture = await getUserStore.getUserPicture(
        fetchedQuote.data.user.user_id
      );
      setPicture(picture);

      //get user votes
      /*  const userVotes = await getUserStore.getUserVotes();
      setUserVotes(userVotes);*/
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('jwt');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('email');
  };

  return (
    <View>
      <Text
        style={{
          marginTop: 30,
          fontSize: 27.5,
          fontWeight: '400',
          textAlign: 'center',
          color: Theme.lightColors.primary,
        }}
      >
        Quote of the day
      </Text>
      <Text
        style={[
          customStyles.body,
          { textAlign: 'center', marginTop: 16, marginBottom: 30 },
        ]}
      >
        Quote of the day is randomly choosen quote.
      </Text>

      <CreateCardFromQuote quote={quote} image={picture} />
    </View>
  );
};

export default RandomQuote;
