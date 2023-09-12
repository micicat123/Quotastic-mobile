import { View, Text } from "react-native";
import LoggedInProps from "../../common/functions";

export default function ProfileScreen({
  isLoggedIn,
  setIsLoggedIn,
}: LoggedInProps) {
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
}
