import { ThemeProvider } from '@rneui/themed';
import BottomTabNavigator from '../components/common/bottomTabNavigator';
import { Theme } from '../config/theme.config';
import { useState } from 'react';
import LoginScreen from './login';
import { View } from 'react-native';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={Theme}>
      <BottomTabNavigator
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
    </ThemeProvider>
  );
}

export default App;
