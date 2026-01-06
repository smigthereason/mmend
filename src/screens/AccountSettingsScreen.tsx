import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

const AccountSettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { colors, isDark: isDarkMode, toggleTheme: toggleDarkMode } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [privacyEnabled, setPrivacyEnabled] = React.useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("Logout pressed"),
      },
    ]);
  };

  const settingsOptions = [
    {
      id: "1",
      title: "Edit Profile",
      icon: "person-outline",
      description: "Update your personal information",
      screen: "EditProfile",
    },
    {
      id: "2",
      title: "Privacy",
      icon: "lock-closed-outline",
      description: "Manage your privacy settings",
      type: "toggle",
      value: privacyEnabled,
      onToggle: () => setPrivacyEnabled(!privacyEnabled),
    },
    {
      id: "3",
      title: "Notifications",
      icon: "notifications-outline",
      description: "Configure notification preferences",
      type: "toggle",
      value: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: "4",
      title: "Appearance",
      icon: "color-palette-outline",
      description: "Dark mode and theme settings",
      type: "toggle",
      value: isDarkMode,
      onToggle: toggleDarkMode,
    },
    {
      id: "5",
      title: "Security",
      icon: "shield-checkmark-outline",
      description: "Password and security settings",
      screen: "Security",
    },
    {
      id: "6",
      title: "Help & Support",
      icon: "help-circle-outline",
      description: "FAQs, contact support",
      screen: "HelpSupport",
    },
    {
      id: "7",
      title: "About",
      icon: "information-circle-outline",
      description: "App version and information",
      screen: "About",
    },
    {
      id: "8",
      title: "Logout",
      icon: "log-out-outline",
      description: "Sign out of your account",
      type: "action",
      color: "#ff3b30",
      action: handleLogout,
    },
  ];

  const handleSettingPress = (item: any) => {
    if (item.screen) {
      navigation.navigate(item.screen as never);
    } else if (item.action) {
      item.action();
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 55,
      paddingBottom: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: 4,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
    },
    headerRightPlaceholder: {
      width: 32,
    },
    accountInfoSection: {
      backgroundColor: colors.surface,
      padding: 20,
      marginBottom: 12,
    },
    avatarContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: colors.primary + "20",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    accountText: {
      flex: 1,
    },
    accountName: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 4,
    },
    accountEmail: {
      fontSize: 14,
      color: colors.textSecondary,
    },
    settingsSection: {
      backgroundColor: colors.surface,
      marginBottom: 20,
    },
    settingItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    settingIconContainer: {
      width: 40,
      alignItems: "center",
      marginRight: 12,
    },
    settingInfo: {
      flex: 1,
    },
    settingTitle: {
      fontSize: 16,
      fontWeight: "500",
      color: colors.text,
      marginBottom: 2,
    },
    settingDescription: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    versionSection: {
      alignItems: "center",
      paddingVertical: 20,
    },
    versionText: {
      fontSize: 14,
      color: colors.textMuted,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account Info */}
        <View style={styles.accountInfoSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color={colors.primary} />
            </View>
            <View style={styles.accountText}>
              <Text style={styles.accountName}>Sarah Johnson</Text>
              <Text style={styles.accountEmail}>sarah.johnson@email.com</Text>
            </View>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.settingsSection}>
          {settingsOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.settingItem}
              onPress={() => handleSettingPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.settingIconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={24}
                  color={item.color || colors.primary}
                />
              </View>
              <View style={styles.settingInfo}>
                <Text
                  style={[
                    styles.settingTitle,
                    item.color && { color: item.color },
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.settingDescription}>
                  {item.description}
                </Text>
              </View>
              {item.type === "toggle" ? (
                <Switch
                  value={item.value}
                  onValueChange={item.onToggle}
                  trackColor={{ false: "#767577", true: colors.primary }}
                  thumbColor="#fff"
                />
              ) : (
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* App Version */}
        <View style={styles.versionSection}>
          <Text style={styles.versionText}>MotherMend v1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountSettingsScreen;