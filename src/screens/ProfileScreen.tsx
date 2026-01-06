// ProfileScreen.tsx - Fixed version with correct theme implementation
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
  const { colors } = useTheme();
  const userPosts = postsData.filter((post) => post.userId === userProfile.id);

  const handleAddPress = () => {
    console.log("Add points pressed");
    setPoints((prev) => prev + 100);
  };

  const navigateToAccountSettings = () => {
    navigation.navigate("AccountSettings" as never);
  };

  const renderBadge = ({ item }: { item: any }) => (
    <View style={[styles.badgeItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
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

  const renderActivity = ({ item }: { item: any }) => (
    <View style={[styles.activityItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
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

  const renderPost = ({ item }: { item: any }) => (
    <View style={[styles.postItem, { backgroundColor: colors.surface, borderColor: colors.border }]}>
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with Profile title and hamburger menu */}
      <View style={[styles.header, { 
        backgroundColor: colors.surface,
        borderBottomColor: colors.border 
      }]}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile</Text>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={navigateToAccountSettings}
        >
          <Ionicons name="menu" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: colors.background }}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border 
        }]}>
          <Image
            source={{ uri: userProfile.image }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: colors.text }]}>{userProfile.name}</Text>
            <Text style={[styles.profileBio, { color: colors.textSecondary }]}>{userProfile.bio}</Text>
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={[styles.locationText, { color: colors.textSecondary }]}>{userProfile.location}</Text>
            </View>
            <View style={[styles.babyInfo, { 
              backgroundColor: colors.primary + "20",
              borderColor: colors.primary 
            }]}>
              <Text style={[styles.babyText, { color: colors.primary }]}>
                👶 {userProfile.babyName}, {userProfile.babyAge}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={[styles.statsContainer, { 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border 
        }]}>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{userProfile.stats.posts}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Posts</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{userProfile.stats.comments}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Comments</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {userProfile.stats.likesReceived}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Likes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>
              {userProfile.stats.helpedOthers}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Helped</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statNumber, { color: colors.primary }]}>{userProfile.stats.streak}</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Day Streak</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={[styles.tabsContainer, { 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border 
        }]}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "posts" && [styles.tabActive, { borderBottomColor: colors.primary }]]}
            onPress={() => setActiveTab("posts")}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.textSecondary },
                activeTab === "posts" && [styles.tabTextActive, { color: colors.primary }]
              ]}
            >
              My Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "badges" && [styles.tabActive, { borderBottomColor: colors.primary }]]}
            onPress={() => setActiveTab("badges")}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.textSecondary },
                activeTab === "badges" && [styles.tabTextActive, { color: colors.primary }]
              ]}
            >
              Badges
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === "activity" && [styles.tabActive, { borderBottomColor: colors.primary }]]}
            onPress={() => setActiveTab("activity")}
          >
            <Text
              style={[
                styles.tabText,
                { color: colors.textSecondary },
                activeTab === "activity" && [styles.tabTextActive, { color: colors.primary }]
              ]}
            >
              Activity
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === "posts" && (
          <View style={[styles.contentSection, { backgroundColor: colors.surface }]}>
            {userPosts.length > 0 ? (
              <FlatList
                data={userPosts}
                renderItem={renderPost}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>No posts yet</Text>
            )}
          </View>
        )}

        {activeTab === "badges" && (
          <View style={[styles.contentSection, { backgroundColor: colors.surface }]}>
            <FlatList
              data={userProfile.badges}
              renderItem={renderBadge}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {activeTab === "activity" && (
          <View style={[styles.contentSection, { backgroundColor: colors.surface }]}>
            <FlatList
              data={userProfile.recentActivity}
              renderItem={renderActivity}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Interests */}
        <View style={[styles.interestsSection, { backgroundColor: colors.surface }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>My Interests</Text>
          <View style={styles.interestsContainer}>
            {userProfile.interests.map((interest, index) => (
              <View key={index} style={[styles.interestChip, { 
                backgroundColor: colors.primary + "20",
                borderColor: colors.primary 
              }]}>
                <Text style={[styles.interestText, { color: colors.primary }]}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 55,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  menuButton: {
    padding: 4,
  },
  profileHeader: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
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
    marginBottom: 8,
  },
  profileBio: {
    fontSize: 14,
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
    marginLeft: 4,
  },
  babyInfo: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: "flex-start",
    borderWidth: 1,
  },
  babyText: {
    fontSize: 14,
    fontWeight: "500",
  },
  statsContainer: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
  },
  tabTextActive: {
    fontWeight: "600",
  },
  contentSection: {
    padding: 20,
    minHeight: 300,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 50,
  },
  postItem: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
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
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
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
    padding: 20,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
  },
  interestText: {
    fontSize: 14,
    fontWeight: "500",
  },
});

export default ProfileScreen;