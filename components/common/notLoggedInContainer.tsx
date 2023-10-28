import { Link } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { Theme, customStyles } from '../../config/theme.config';

const NotLogegdInContainer = ({ profile }) => {
  return (
    <View style={{ padding: 50, paddingTop: 80 }}>
      {profile ? (
        <Text
          style={[customStyles.h4, { marginBottom: 50, textAlign: 'center' }]}
        >
          You need to log in to see your{' '}
          <Text style={{ color: Theme.lightColors.primary }}>profile.</Text>
        </Text>
      ) : (
        <Text
          style={[customStyles.h4, { marginBottom: 50, textAlign: 'center' }]}
        >
          You need to log in to update your{' '}
          <Text style={{ color: Theme.lightColors.primary }}>settings.</Text>
        </Text>
      )}

      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <TouchableOpacity style={[customStyles.filledButton, { width: 137 }]}>
          <Link href='/register' style={[customStyles.buttonText]}>
            <Text>Sign up</Text>
          </Link>
        </TouchableOpacity>
        <TouchableOpacity style={[customStyles.filledButton, { width: 137 }]}>
          <Link href='/login' style={[customStyles.buttonText]}>
            <Text>Log in</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotLogegdInContainer;
