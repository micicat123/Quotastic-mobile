import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const logout = async () => {
    await AsyncStorage.removeItem('jwt');
    await AsyncStorage.removeItem('firstName');
    await AsyncStorage.removeItem('lastName');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('email');
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, marginLeft: 30, marginRight: 30 }}
    >
      <Text style={[customStyles.h4, { color: Theme.lightColors.primary }]}>
        Profile <Text style={customStyles.h4}>Settings</Text>
      </Text>

      <View style={{ gap: 25 }}>
        <View style={{ flexDirection: 'row', gap: 25, marginTop: 25 }}>
          <TouchableOpacity style={[customStyles.filledButton, { flex: 1 }]}>
            <Link href='/settings/edit-info' style={customStyles.buttonText}>
              <Text>Change your contact information</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity style={[customStyles.filledButton, { flex: 1 }]}>
            <Link href='/settings/edit-img' style={customStyles.buttonText}>
              <Text>Change your profile picture</Text>
            </Link>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={[customStyles.filledButton, { width: '65%' }]}
          >
            <Link href='/settings/edit-pass' style={customStyles.buttonText}>
              <Text>Change your password</Text>
            </Link>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              customStyles.outlinedButton,
              { width: '50%', marginTop: 50, flex: 1 },
            ]}
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
      </View>
    </ScrollView>
  );
}

const settingsStyles: any = {
  profileSettings: {
    backgroundColor: Theme.lightColors.primary,
  },
};
