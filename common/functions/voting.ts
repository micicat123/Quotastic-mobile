import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetUserStore } from '../../api/user/get_user';
import customAxios from '../../config/axios.config';
import { Quote } from '../../models/quote';

const getVotes = async (setUserVotes: Function) => {
  const getUserStore = new GetUserStore();
  const response = await getUserStore.getUserVotes();
  setUserVotes(response);
};

const getVote = (quote_id: number, userVotes) => {
  if (userVotes) {
    const decision: any = userVotes.find(
      (d: any) => d.quote.quote_id == quote_id
    );
    return decision ? decision.decision : 1;
  }
  return 1;
};

const UpvoteDownvote = async (
  quote_id: number,
  upvote: boolean,
  user_id_of_quote: string,
  votes: number,
  quotes: Set<Quote>,
  setQuotes: React.Dispatch<React.SetStateAction<Set<Quote>>>,
  userVotes: any[],
  setUserVotes: Function
) => {
  const user_id_of_person_liking = await AsyncStorage.getItem('userId');
  if (user_id_of_person_liking == user_id_of_quote) {
    console.log("You can't vote for your own quote");
    return null;
  } else if (upvote) {
    customAxios
      .put(`vote/upvote/${quote_id}`)
      .then((res) => {
        if (res.data.upvotes < votes) {
          handleRerender(
            quote_id,
            res.data.upvotes,
            1,
            quotes,
            setQuotes,
            userVotes,
            setUserVotes
          );
        } else {
          handleRerender(
            quote_id,
            res.data.upvotes,
            2,
            quotes,
            setQuotes,
            userVotes,
            setUserVotes
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    customAxios
      .put(`vote/downvote/${quote_id}`)
      .then((res) => {
        if (res.data.downvotes < votes) {
          handleRerender(
            quote_id,
            res.data.upvotes,
            1,
            quotes,
            setQuotes,
            userVotes,
            setUserVotes
          );
        } else {
          handleRerender(
            quote_id,
            res.data.upvotes,
            0,
            quotes,
            setQuotes,
            userVotes,
            setUserVotes
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const handleRerender = (
  quote_id: number,
  newUpvotes: number,
  status: number,
  quotes: Set<Quote>,
  setQuotes: React.Dispatch<React.SetStateAction<Set<Quote>>>,
  userVotes: any[],
  setUserVotes: Function
) => {
  const quoteToUpdate = [...quotes].find(
    (quote: Quote) => quote.quote_id === quote_id
  );

  if (quoteToUpdate) {
    quoteToUpdate.upvotes = newUpvotes;
    setQuotes(new Set([...quotes]));

    const decisionToUpdate = userVotes.find(
      (d: any) => d.quote.quote_id === quote_id
    );
    if (decisionToUpdate) {
      decisionToUpdate.decision = status;
      setQuotes(new Set([...quotes]));
    } else {
      setUserVotes((oldDecisions: any) => [
        ...oldDecisions,
        { decision: status, quote: { quote_id: quoteToUpdate.quote_id } },
      ]);
    }
  }
};

export { getVote, UpvoteDownvote, handleRerender, getVotes };
