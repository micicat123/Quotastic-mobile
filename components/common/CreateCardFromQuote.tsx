import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme, customStyles } from '../../config/theme.config';
import { UpvoteDownvote } from '../../common/functions/voting';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { isQuoteCreatedByCurrentUser } from '../../common/functions/user';
import EditQuote from '../popups/editQuote';
import DeleteQuote from '../popups/deleteQuote';

const CreateCardFromQuote = ({
  quote,
  image,
  vote,
  quotes,
  setQuotes,
  userVotes,
  setUserVotes,
  isLoggedIn,
}) => {
  const [stateVote, setStateVote] = useState(vote);
  const [userOwnsQuote, setUserOwnsQuote] = useState(false);
  const [editQuoteVisible, setEditQuoteVisible] = useState(false);
  const [deleteQuoteVisible, setDeleteQuoteVisible] = useState(false);

  useEffect(() => {
    setStateVote(vote);
    checkForOwnership();
  }, [vote]);

  const checkForOwnership = async () => {
    const fetchedOwnership = await isQuoteCreatedByCurrentUser(quote);
    setUserOwnsQuote(fetchedOwnership);
  };

  return (
    <>
      <View style={styles.card}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 2,
          }}
        >
          <Icon
            name={'chevron-up'}
            size={25}
            color={stateVote === 2 ? Theme.lightColors.primary : null}
            onPress={() => {
              if (isLoggedIn) {
                UpvoteDownvote(
                  quote.quote_id,
                  true,
                  quote.user.user_id,
                  quote.upvotes,
                  quotes,
                  setQuotes,
                  userVotes,
                  setUserVotes
                );
                setStateVote(stateVote === 2 ? 1 : 2);
              }
            }}
          />
          <Text style={customStyles.body}>{quote.upvotes}</Text>
          <Icon
            name={'chevron-down'}
            size={25}
            color={stateVote === 0 ? Theme.lightColors.primary : null}
            onPress={() => {
              if (isLoggedIn) {
                UpvoteDownvote(
                  quote.quote_id,
                  false,
                  quote.user.user_id,
                  quote.upvotes,
                  quotes,
                  setQuotes,
                  userVotes,
                  setUserVotes
                );
                setStateVote(stateVote === 0 ? 1 : 0);
              }
            }}
          />
        </View>
        <View style={{ justifyContent: 'space-between', flex: 10 }}>
          <Text style={[customStyles.h5, { paddingBottom: 21 }]}>
            {quote.quote}
          </Text>

          <Link
            href={{
              pathname: '/profile',
              params: {
                userId: quote.user.user_id,
                firstName: quote.user.first_name,
                lastName: quote.user.last_name,
              },
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                gap: 10,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  resizeMode: 'cover',
                }}
              />

              <Text style={customStyles.caption}>
                {quote.user.first_name} {quote.user.last_name}
              </Text>
            </View>
          </Link>
          <EditQuote
            setModalVisible={setEditQuoteVisible}
            modalVisible={editQuoteVisible}
            quoteId={quote.quote_id}
            initialQuote={quote.quote}
          />
          <DeleteQuote
            setModalVisible={setDeleteQuoteVisible}
            modalVisible={deleteQuoteVisible}
            quoteId={quote.quote_id}
          />
        </View>
        {userOwnsQuote && (
          <View
            style={{
              flex: 2,
              gap: 22.5,
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
          >
            <Icon
              name={'settings-outline'}
              size={25}
              color={Theme.lightColors.primary}
              onPress={() => {
                setEditQuoteVisible(true);
              }}
            />
            <Icon
              name={'close'}
              size={30}
              color={Theme.lightColors.primary}
              onPress={() => {
                setDeleteQuoteVisible(true);
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 21,
    marginBottom: 18,
    borderRadius: 16,
    width: '100%',
    paddingTop: 16,
    paddingRight: 32,
    paddingBottom: 16,
    paddingLeft: 16,
    backgroundColor: 'white',
    elevation: 4,
  },
});

export default CreateCardFromQuote;
