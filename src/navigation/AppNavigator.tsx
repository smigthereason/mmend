import React from "react";
import { NavigationContainer } from "@react-navigation/native";
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
import { ThemeProvider } from "../context/ThemeContext";

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

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarShowLabel: true,
            tabBarActiveTintColor: "#ff85a2",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "#fff",
              borderTopWidth: 1,
              borderTopColor: "#eee",
              height: 100,
              paddingBottom: 8,
              paddingTop: 8,
            },
            headerStyle: {
              backgroundColor: "white",
            },
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
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
    </ThemeProvider>
  );
};

export default AppNavigator;