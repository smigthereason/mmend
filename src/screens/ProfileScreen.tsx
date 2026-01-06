import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { userProfile } from "../data/profile";
import { postsData } from "../data/posts";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

const ProfileScreen: React.FC = () => {
  const [points, setPoints] = useState(userProfile.points);
  const [activeTab, setActiveTab] = useState("posts");
  const navigation = useNavigation();
  const { colors, isDarkMode } = useTheme();
  const userPosts = postsData.filter((post) => post.userId === userProfile.id);

  const handleAddPress = () => {
    console.log("Add points pressed");
    setPoints((prev) => prev + 100);
  };

  const navigateToAccountSettings = () => {
    navigation.navigate("AccountSettings" as never);
  };

  const renderBadge = ({ item }) => (
    <View style={[styles.badgeItem, { backgroundColor: colors.surface }]}>
      <View
        style={[styles.badgeIcon, { backgroundColor: colors.primary + "20" }]}
      >
        <Text style={styles.badgeIconText}>{item.icon}</Text>
      </View>
      <View style={styles.badgeInfo}>
        <Text style={[styles.badgeName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text
          style={[styles.badgeDescription, { color: colors.textSecondary }]}
        >
          {item.description}
        </Text>
        <Text style={[styles.badgeDate, { color: colors.textMuted }]}>
          Earned {item.earnedDate}
        </Text>
      </View>
    </View>
  );

  const renderActivity = ({ item }) => (
    <View style={[styles.activityItem, { backgroundColor: colors.surface }]}>
      <View
        style={[
          styles.activityIcon,
          { backgroundColor: colors.primary + "20" },
        ]}
      >
        <Ionicons
          name={
            item.type === "post"
              ? "document-text-outline"
              : item.type === "comment"
              ? "chatbubble-outline"
              : item.type === "like"
              ? "heart-outline"
              : item.type === "badge"
              ? "trophy-outline"
              : "medical-outline"
          }
          size={24}
          color={colors.primary}
        />
      </View>
      <View style={styles.activityInfo}>
        <Text style={[styles.activityTitle, { color: colors.text }]}>
          {item.title}
        </Text>
        <Text
          style={[styles.activityDescription, { color: colors.textSecondary }]}
        >
          {item.description}
        </Text>
        <Text style={[styles.activityTime, { color: colors.textMuted }]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  const renderPost = ({ item }) => (
    <View style={[styles.postItem, { backgroundColor: colors.surface }]}>
      <Text style={[styles.postTitle, { color: colors.text }]}>
        {item.title}
      </Text>
      <Text
        style={[styles.postContent, { color: colors.textSecondary }]}
        numberOfLines={3}
      >
        {item.content}
      </Text>
      <View style={styles.postStats}>
        <View style={styles.statItem}>
          <Ionicons
            name="heart-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text style={[styles.statText, { color: colors.textSecondary }]}>
            {item.likes}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons
            name="chatbubble-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text style={[styles.statText, { color: colors.textSecondary }]}>
            {item.comments}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons
            name="share-outline"
            size={16}
            color={colors.textSecondary}
          />
          <Text style={[styles.statText, { color: colors.textSecondary }]}>
            {item.shares}
          </Text>
        </View>
      </View>
    </View>
  );

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
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderBottomColor: "#eeeeee9d",
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    menuButton: {
      padding: 4,
    },
    profileHeader: {
      flexDirection: "row",
      padding: 20,
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginRight: 20,
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    profileBio: {
      fontSize: 14,
      color: colors.textSecondary,
      marginBottom: 12,
      lineHeight: 20,
    },
    locationRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 8,
    },
    locationText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginLeft: 4,
    },
    babyInfo: {
      backgroundColor: colors.primary + "20",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      alignSelf: "flex-start",
      borderWidth: 1,
      borderColor: colors.primary,
    },
    babyText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: "500",
    },
    statsContainer: {
      flexDirection: "row",
      backgroundColor: colors.surface,
      paddingVertical: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    statCard: {
      flex: 1,
      alignItems: "center",
    },
    statNumber: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: 4,
    },
    statLabel: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    tabsContainer: {
      flexDirection: "row",
      backgroundColor: colors.surface,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 16,
    },
    tabActive: {
      borderBottomWidth: 2,
      borderBottomColor: colors.primary,
    },
    tabText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
    tabTextActive: {
      color: colors.primary,
      fontWeight: "600",
    },
    contentSection: {
      backgroundColor: colors.surface,
      padding: 20,
      minHeight: 300,
    },
    emptyText: {
      textAlign: "center",
      color: colors.textMuted,
      fontSize: 16,
      marginTop: 50,
    },
    postItem: {
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    postTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    postContent: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 12,
    },
    postStats: {
      flexDirection: "row",
    },
    statItem: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 20,
    },
    statText: {
      fontSize: 14,
      marginLeft: 4,
    },
    badgeItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    badgeIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    badgeIconText: {
      fontSize: 20,
    },
    badgeInfo: {
      flex: 1,
    },
    badgeName: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 4,
    },
    badgeDescription: {
      fontSize: 14,
      marginBottom: 4,
    },
    badgeDate: {
      fontSize: 12,
    },
    activityItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.background,
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.border,
    },
    activityIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16,
    },
    activityInfo: {
      flex: 1,
    },
    activityTitle: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 4,
    },
    activityDescription: {
      fontSize: 14,
      marginBottom: 4,
    },
    activityTime: {
      fontSize: 12,
    },
    interestsSection: {
      backgroundColor: colors.surface,
      padding: 20,
      marginTop: 12,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 16,
    },
    interestsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    interestChip: {
      backgroundColor: colors.primary + "20",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 8,
      marginBottom: 8,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    interestText: {
      fontSize: 14,
      color: colors.primary,
      fontWeight: "500",
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Profile title and hamburger menu */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={navigateToAccountSettings}
        >
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: userProfile.image }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{userProfile.name}</Text>
            <Text style={styles.profileBio}>{userProfile.bio}</Text>
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.locationText}>{userProfile.location}</Text>
            </View>
            <View style={styles.babyInfo}>
              <Text style={styles.babyText}>
                👶 {userProfile.babyName}, {userProfile.babyAge}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.stats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.stats.comments}</Text>
            <Text style={styles.statLabel}>Comments</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {userProfile.stats.likesReceived}
            </Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {userProfile.stats.helpedOthers}
            </Text>
            <Text style={styles.statLabel}>Helped</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{userProfile.stats.streak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "posts" && styles.tabActive]}
            onPress={() => setActiveTab("posts")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "posts" && styles.tabTextActive,
              ]}
            >
              My Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "badges" && styles.tabActive]}
            onPress={() => setActiveTab("badges")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "badges" && styles.tabTextActive,
              ]}
            >
              Badges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "activity" && styles.tabActive]}
            onPress={() => setActiveTab("activity")}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === "activity" && styles.tabTextActive,
              ]}
            >
              Activity
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === "posts" && (
          <View style={styles.contentSection}>
            {userPosts.length > 0 ? (
              <FlatList
                data={userPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <Text style={styles.emptyText}>No posts yet</Text>
            )}
          </View>
        )}

        {activeTab === "badges" && (
          <View style={styles.contentSection}>
            <FlatList
              data={userProfile.badges}
              renderItem={renderBadge}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {activeTab === "activity" && (
          <View style={styles.contentSection}>
            <FlatList
              data={userProfile.recentActivity}
              renderItem={renderActivity}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Interests */}
        <View style={styles.interestsSection}>
          <Text style={styles.sectionTitle}>My Interests</Text>
          <View style={styles.interestsContainer}>
            {userProfile.interests.map((interest, index) => (
              <View key={index} style={styles.interestChip}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
