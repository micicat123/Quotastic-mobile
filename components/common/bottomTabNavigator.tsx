import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../app/home';
import ProfileScreen from '../../app/profile';
import SettingsScreen from '../../app/settings';
import Icon from 'react-native-vector-icons/Ionicons';
import { Theme } from '../../config/theme.config';
import { View, Text } from 'react-native';
import Header from './header';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 60, paddingTop: 5, paddingBottom: 5 },
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            color = focused
              ? Theme.lightColors.primary
              : Theme.lightColors.dark;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            color = focused
              ? Theme.lightColors.primary
              : Theme.lightColors.dark;
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
            color = focused
              ? Theme.lightColors.primary
              : Theme.lightColors.dark;
          }

          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name='Home'
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? <Text>Home</Text> : <Text></Text>;
          },
          header: () => <Header back={false} />,
        }}
      >
        {() => <HomeScreen />}
      </Tab.Screen>
      <Tab.Screen
        name='Profile'
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? <Text>Profile</Text> : <Text></Text>;
          },
          header: () => <Header back={false} />,
        }}
      >
        {() => <ProfileScreen />}
      </Tab.Screen>
      <Tab.Screen
        name='Settings'
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? <Text>Settings</Text> : <Text></Text>;
          },
          header: () => <Header back={false} />,
        }}
      >
        {() => <SettingsScreen />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
