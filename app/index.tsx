import { ThemeProvider } from "@rneui/themed";
import BottomTabNavigator from "../components/common/bottomTabNavigator";
import { Theme } from "../config/theme.config";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <BottomTabNavigator />
    </ThemeProvider>
  );
}

export default App;
