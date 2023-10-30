import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { checkForUser } from '../../common/functions/user';
import NotLogegdInContainer from '../../components/common/notLoggedInContainer';

export default function SettingsScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkForUser(setIsLoggedIn);
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('jwt');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('email');
    router.replace('/');
  };

  if (!isLoggedIn) {
    return <NotLogegdInContainer profile={false} />;
  } else {
    return (
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, marginLeft: 30, marginRight: 30 }}
      >
        <Text
          style={[
            customStyles.h4,
            { color: Theme.lightColors.primary, marginTop: 32 },
          ]}
        >
          Profile <Text style={customStyles.h4}>Settings</Text>
        </Text>

        <View style={{ gap: 15, alignItems: 'center', marginTop: 32 }}>
          <View style={{ flexDirection: 'row', gap: 12 }}>
            <TouchableOpacity
              style={[
                customStyles.filledButton,
                { width: 170, height: 60, justifyContent: 'center' },
              ]}
            >
              <Link href='/settings/edit-info' style={customStyles.buttonText}>
                <Text>Change contact information</Text>
              </Link>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                customStyles.filledButton,
                { width: 170, height: 60, justifyContent: 'center' },
              ]}
            >
              <Link href='/settings/edit-img' style={customStyles.buttonText}>
                <Text>Change profile picture</Text>
              </Link>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              customStyles.filledButton,
              { width: 200, justifyContent: 'center' },
            ]}
          >
            <Link href='/settings/edit-pass' style={customStyles.buttonText}>
              <Text>Change password</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity
            style={[customStyles.outlinedButton, { width: 200, marginTop: 32 }]}
            onPress={logout}
          >
            <Text
              style={[
                customStyles.buttonText,
                { color: Theme.lightColors.primary },
              ]}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const settingsStyles: any = {
  profileSettings: {
    backgroundColor: Theme.lightColors.primary,
  },
};
