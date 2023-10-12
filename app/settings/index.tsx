import { View, Text } from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';

export default function SettingsScreen() {
  return (
    <View>
      <Text style={[customStyles.h4, { color: Theme.lightColors.primary }]}>
        Profile <Text style={customStyles.h4}>Settings</Text>
      </Text>
      <Text>Change your contact information</Text>
      <Text>Change your password</Text>
      <Text>Change your profile picture</Text>
    </View>
  );
}
