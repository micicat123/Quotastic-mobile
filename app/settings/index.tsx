import { View, Text } from "react-native";
import LoggedInProps from "../../common/functions";

export default function SettingsScreen({
  isLoggedIn,
  setIsLoggedIn,
}: LoggedInProps) {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}
