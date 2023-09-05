import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../app/home";
import ProfileScreen from "../../app/profile";
import SettingsScreen from "../../app/settings";
import Icon from "react-native-vector-icons/Ionicons";
import { Theme } from "../../config/theme.config";
import { View, Text } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            color = focused
              ? Theme.lightColors.primary
              : Theme.lightColors.dark;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            color = focused
              ? Theme.lightColors.primary
              : Theme.lightColors.dark;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            color = focused
              ? Theme.lightColors.primary
              : Theme.lightColors.dark;
          }

          return <Icon name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? <Text>Home</Text> : <Text></Text>;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? <Text>Profile</Text> : <Text></Text>;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            return focused ? <Text>Settings</Text> : <Text></Text>;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
