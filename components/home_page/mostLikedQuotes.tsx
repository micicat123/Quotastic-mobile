import { View, Text, TouchableOpacity, Image } from 'react-native';
import LoggedInProps from '../../common/interface';
import { useEffect, useState } from 'react';
import { Quote } from '../../models/quote';
import { GetQuotesStore } from '../../api/quotes/get_quotes';
import CreateCardFromQuote from '../../common/component';
import { Theme, customStyles } from '../../config/theme.config';
import { GetUserStore } from '../../api/user/get_user';

const MostLikedQuotes = () => {
  const [quotes, setQuotes] = useState<Set<Quote>>(new Set());
  const [userPictures, setUserPictures] = useState({});
  const [userVotes, setUserVotes] = useState([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const getQuotesStore = new GetQuotesStore();
  const getUserStore = new GetUserStore();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      //get quotes
      const fetchedQuotes: any = await getQuotesStore.mostLikedQuotes(page);
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

      //get user votes
      const userVotes = await getUserStore.getUserVotes();
      setUserVotes(userVotes);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(userVotes);
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
        Most liked quotes
      </Text>
      <Text
        style={[
          customStyles.body,
          { textAlign: 'center', marginTop: 16, marginBottom: 30 },
        ]}
      >
        Most liked quotes on the platform. Sign up or login to like the quotes
        and keep them saved in your profile
      </Text>
      {[...quotes].map((quote: Quote, index) => (
        <View key={index}>
          <CreateCardFromQuote
            quote={quote}
            image={userPictures[quote.user.user_id]}
          />
        </View>
      ))}

      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity style={[customStyles.filledButton, { width: 137 }]}>
          <Text style={[customStyles.buttonText, customStyles.body]}>
            Load more
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MostLikedQuotes;
