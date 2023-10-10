import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme, customStyles } from '../../config/theme.config';
import { UpvoteDownvote } from '../../common/functions/voting';
import { useEffect, useState } from 'react';
import { isConstructorDeclaration } from 'typescript';
import { Link, useNavigation } from 'expo-router';

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

  useEffect(() => {
    setStateVote(vote);
  }, [vote]);

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
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
      <View style={{ justifyContent: 'space-between' }}>
        <Text
          style={[customStyles.h5, { paddingRight: 50, paddingBottom: 21 }]}
        >
          {quote.quote}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
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
            <Image
              source={{ uri: image }}
              style={{
                width: 35,
                height: 35,
                borderRadius: 50,
                resizeMode: 'cover',
              }}
            />
          </Link>
          <Text style={customStyles.caption}>
            {quote.user.first_name} {quote.user.last_name}
          </Text>
        </View>
      </View>
    </View>
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
