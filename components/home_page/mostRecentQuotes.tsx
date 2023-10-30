import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { Quote } from '../../models/quote';
import { GetQuotesStore } from '../../api/quotes/get_quotes';
import CreateCardFromQuote from '../common/createCardFromQuote';
import { Theme, customStyles } from '../../config/theme.config';
import { GetUserStore } from '../../api/user/get_user';
import { getVote, getVotes } from '../../common/functions/voting';

const MostRecentQuotes = () => {
  const [quotes, setQuotes] = useState<Set<Quote>>(new Set());
  const [userPictures, setUserPictures] = useState({});
  const [userVotes, setUserVotes] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const getQuotesStore = new GetQuotesStore();
  const getUserStore = new GetUserStore();

  useEffect(() => {
    fetchQuotes();
    getVotes(setUserVotes);
  }, []);

  const fetchQuotes = async () => {
    try {
      //get quotes
      const fetchedQuotes: any = await getQuotesStore.mostRecentQuotes(page);
      const newQuotesArray: Quote[] = [...quotes, ...fetchedQuotes.data.data];
      const newQuotesSet = new Set<Quote>(newQuotesArray);
      setQuotes(newQuotesSet);
      setIsLastPage(fetchedQuotes.data.isLastPage);

      //get pictures
      for (const quote of newQuotesSet) {
        const picture = await getUserStore.getUserPicture(quote.user.user_id);
        setUserPictures((prevPictures) => ({
          ...prevPictures,
          [quote.user.user_id]: picture,
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!quotes || quotes.size < 1) {
    return <></>;
  } else {
    return (
      <View>
        <Text
          style={{
            marginTop: 64,
            fontSize: 27.5,
            fontWeight: '400',
            textAlign: 'center',
            color: Theme.lightColors.primary,
          }}
        >
          Most recent quotes
        </Text>
        <Text
          style={[
            customStyles.body,
            { textAlign: 'center', marginTop: 16, marginBottom: 30 },
          ]}
        >
          Recent quotes updates as soon user adds new quote. Go ahed show them
          that you seen the new quote and like the ones you like.
        </Text>
        {[...quotes].map((quote: Quote, index) => {
          const vote = getVote(quote.quote_id, userVotes);
          return (
            <View key={index}>
              <CreateCardFromQuote
                isLoggedIn={true}
                quote={quote}
                image={userPictures[quote.user.user_id]}
                vote={vote}
                quotes={quotes}
                setQuotes={setQuotes}
                userVotes={userVotes}
                setUserVotes={setUserVotes}
              />
            </View>
          );
        })}

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 35,
          }}
        >
          {!isLastPage ? (
            <TouchableOpacity
              style={[customStyles.filledButton, { width: 137 }]}
              onPress={() => {
                setPage(page + 1);
                fetchQuotes();
              }}
            >
              <Text style={[customStyles.buttonText]}>Load more</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
};

export default MostRecentQuotes;
