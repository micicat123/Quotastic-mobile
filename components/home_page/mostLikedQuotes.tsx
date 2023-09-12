import { StyleSheet } from 'react-native';
import LoggedInProps from '../../common/functions';
import { useEffect, useState } from 'react';
import { Quote } from '../../models/quote';
import { GetQuotesStore } from '../../api/quotes/get_quotes';

const MostLikedQuotes: React.FC<LoggedInProps> = ({
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const getQuotesStore = new GetQuotesStore();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const fetchedQuotes: any = await getQuotesStore.mostLikedQuotes(page);
      setQuotes(quotes.concat(fetchedQuotes.data));
    } catch (err) {
      console.error(err);
    }
  };

  console.log(quotes);
  return <></>;
};

export default MostLikedQuotes;
