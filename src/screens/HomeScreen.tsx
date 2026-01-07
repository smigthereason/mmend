// HomeScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/home/Header";
import StoryList from "../components/stories/StoryList";
import PostList from "../components/home/PostList";
import { UserStory, Post } from "../components/shared/types";
import { postsData } from "../data/posts";
import { storiesData } from "../data/stories";
import { useTheme } from "../context/ThemeContext";

interface HomeScreenProps {
  navigation?: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState<UserStory[]>(storiesData); // Use full data directly
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [points, setPoints] = useState(1578);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(postsData);
      setRefreshing(false);
      setPoints(prev => prev + 10);
    }, 1000);
  }, []);

  const handleAddPress = useCallback(() => {
    console.log("Add button pressed");
    setPoints(prev => prev + 50);
  }, []);

  const handleCreateStory = useCallback(() => {
    Alert.alert(
      "Create Story",
      "Choose an option",
      [
        {
          text: "Take Photo",
          onPress: () => console.log("Open camera"),
        },
        {
          text: "Choose from Gallery",
          onPress: () => console.log("Open gallery"),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  }, []);

  const handleStoryPress = useCallback((index: number) => {
    navigation?.navigate("Stories", { initialIndex: index });
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      backgroundColor: colors.surface,
    },
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <Header 
            onAddPress={handleAddPress} 
            points={points} 
            onStoryPress={handleCreateStory}
          />
        </SafeAreaView>

        <StoryList 
          stories={stories} 
          onStoryPress={handleStoryPress}
          onCreateStory={handleCreateStory}
        />
        
        <PostList
          posts={posts}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          emptyMessage="No posts yet. Be the first to share your story!"
        />
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;