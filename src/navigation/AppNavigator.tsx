import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import MessagesScreen from "../screens/MessagesScreen";
import ChatScreen from "../screens/ChatScreen";
import ConsultScreen from "../screens/ConsultScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AccountSettingsScreen from "../screens/AccountSettingsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SecurityScreen from "../screens/SecurityScreen";
import HelpSupportScreen from "../screens/HelpSupportScreen";
import AboutScreen from "../screens/AboutScreen";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Create a stack for Profile
const ProfileStack = () => {  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen 
        name="AccountSettings" 
        component={AccountSettingsScreen}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
      />
      <Stack.Screen 
        name="Security" 
        component={SecurityScreen}
      />
      <Stack.Screen 
        name="HelpSupport" 
        component={HelpSupportScreen}
      />
      <Stack.Screen 
        name="About" 
        component={AboutScreen}
      />
    </Stack.Navigator>
  );
};

// Create a stack for Messages
const MessagesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MessagesList" component={MessagesScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
};

// Create a stack for Home
const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
};

// Create a stack for Search
const SearchStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SearchMain" component={SearchScreen} />
    </Stack.Navigator>
  );
};

// Create a stack for Consult
const ConsultStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ConsultMain" component={ConsultScreen} />
    </Stack.Navigator>
  );
};

// Main AppNavigator component
const AppNavigator = () => {
  const [badgeCount, setBadgeCount] = React.useState<number | undefined>(
    undefined
  );
  const { colors, isDark } = useTheme();

  // Create navigation themes based on current theme
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;
  
  const customTheme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      primary: colors.primary,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
    },
  };

  return (
    <NavigationContainer theme={customTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            height: 100,
            paddingBottom: 8,
            paddingTop: 8,
          },
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTitleStyle: {
            fontWeight: "bold",
            color: colors.text,
          },
          headerTitleAlign: "center",
          headerTintColor: colors.text,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
            title: "Home",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
            title: "Search",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Messages"
          component={MessagesStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="chatbubble" size={size} color={color} />
            ),
            tabBarBadge: badgeCount,
            title: "Messages",
            headerShown: false,
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              setBadgeCount(undefined);
            },
          })}
        />
        <Tab.Screen
          name="Consult"
          component={ConsultStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="medical" size={size} color={color} />
            ),
            title: "Consult",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
            title: "Profile",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

// Wrap the main app with ThemeProvider
const AppWithTheme = () => {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
};

export default AppWithTheme;