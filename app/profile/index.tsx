import { View, Text, ScrollView, Image } from 'react-native';
import { checkForUser } from '../../common/functions/user';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { Theme, customStyles } from '../../config/theme.config';
import { GetUserStore } from '../../api/user/get_user';
import UserStatistics from '../../components/profile_page/userStatistics';
import UsersMostLikedQuotes from '../../components/profile_page/usersMostLikedQuotes';
import UserLikes from '../../components/profile_page/usersLikes';
import UserQuotes from '../../components/profile_page/usersQuotes';
import Header from '../../components/common/header';
import NotLogegdInContainer from '../../components/common/notLoggedInContainer';

export default function ProfileScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const route: any = useRoute();

  useEffect(() => {
    checkForUser(setIsLoggedIn);

    if (route.params && route.params.userId) {
      setUserId(route.params.userId);
      setName(route.params.firstName + ' ' + route.params.lastName);
      setImageAndName(route.params.userId);
    } else {
      setId();
    }
  }, [route.params]);

  const setId = async () => {
    const fetchedUserId = await AsyncStorage.getItem('userId');
    if (fetchedUserId) {
      setUserId(fetchedUserId);
      setImageAndName(fetchedUserId);
    }
  };

  const setImageAndName = async (id: any) => {
    const getUserStore = new GetUserStore();
    const picture = await getUserStore.getUserPicture(id);
    setImage(picture);
    if (!route.params) {
      const firstName = await AsyncStorage.getItem('firstName');
      const lastName = await AsyncStorage.getItem('lastName');
      setName(firstName + ' ' + lastName);
    }
  };

  if (!isLoggedIn && !route.params) {
    return <NotLogegdInContainer profile={true} />;
  } else if (!userId || !image) {
    return <></>;
  } else {
    return (
      <>
        {route.params ? <Header back={true} /> : null}
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={profileStyles.hero}>
            <View
              style={{
                marginTop: 56,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: 70,
                  height: 70,
                  borderRadius: 50,
                  resizeMode: 'cover',
                }}
              />

              <Text
                style={[
                  customStyles.h4,
                  { color: 'white', paddingTop: 24, paddingBottom: 22 },
                ]}
              >
                {name}
              </Text>

              <UserStatistics userId={userId} />
            </View>
          </View>
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <UsersMostLikedQuotes userId={userId} />
            <UserQuotes userId={userId} />
            <UserLikes userId={userId} />
          </View>
        </ScrollView>
      </>
    );
  }
}

const profileStyles: any = {
  hero: {
    height: 280,
    width: '100%',
    backgroundColor: Theme.lightColors.primary,
  },
};
