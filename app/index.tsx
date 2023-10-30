import { Text } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import BottomTabNavigator from '../components/common/bottomTabNavigator';
import { Theme } from '../config/theme.config';
import {
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_700Bold,
  useFonts,
} from '@expo-google-fonts/raleway';

function App() {
  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
    Raleway_400Regular,
    Raleway_300Light,
  });

  if (!fontsLoaded) {
    return <Text>Loading app</Text>;
  }
  return (
    <ThemeProvider theme={Theme}>
      <BottomTabNavigator />
    </ThemeProvider>
  );
}

export default App;
