import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Quote } from '../../models/quote';
import { GetQuotesStore } from '../../api/quotes/get_quotes';
import CreateCardFromQuote from '../common/createCardFromQuote';
import { Theme, customStyles } from '../../config/theme.config';
import { GetUserStore } from '../../api/user/get_user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getVote, getVotes } from '../../common/functions/voting';

const RandomQuote = () => {
  const [quotes, setQuotes] = useState<Set<Quote>>(new Set());
  const [picture, setPicture] = useState<any>();
  const [userVotes, setUserVotes] = useState([]);
  const [vote, setVote] = useState(1);
  const getQuotesStore = new GetQuotesStore();
  const getUserStore = new GetUserStore();

  useEffect(() => {
    fetchQuote();
    getVotes(setUserVotes);
  }, []);

  const fetchQuote = async () => {
    try {
      const fetchedQuote: any = await getQuotesStore.randomQuote();
      const newQuotesSet = new Set([...quotes]);
      newQuotesSet.add(fetchedQuote.data);
      setQuotes(newQuotesSet);

      const picture = await getUserStore.getUserPicture(
        fetchedQuote.data.user.user_id
      );
      setPicture(picture);

      const vote = getVote(fetchedQuote.data.quote_id, userVotes);
      setVote(vote);
    } catch (err) {
      console.error(err);
    }
  };

  if (quotes.size < 1) {
    return <></>;
  } else {
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

        <CreateCardFromQuote
          isLoggedIn={true}
          quote={[...quotes][0]}
          image={picture}
          vote={vote}
          quotes={quotes}
          setQuotes={setQuotes}
          userVotes={userVotes}
          setUserVotes={setUserVotes}
        />
      </View>
    );
  }
};

export default RandomQuote;
