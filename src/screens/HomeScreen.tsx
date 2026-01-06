import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/home/Header";
import StoryList from "../components/home/StoryList";
import PostList from "../components/home/PostList";
import { Story, Post } from "../components/shared/types";
import { postsData } from "../data/posts";
import { useTheme } from "../context/ThemeContext";

const HomeScreen: React.FC = () => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [points, setPoints] = useState(1578);

  // Convert sample posts to match PostItem format
  const convertToPostItemFormat = (postData: Post[]) => {
    return postData.map(post => ({
      id: post.id,
      username: post.userName,
      userImage: post.userImage,
      postImage: `https://images.unsplash.com/photo-1518568814500-bf0f8d125f${Math.floor(Math.random() * 100)}`, // Random image
      likes: post.likes,
      caption: `${post.title}\n\n${post.content.substring(0, 150)}...`,
      comments: post.comments,
      time: post.timestamp,
    }));
  };

  // Create stories from recent posts
  const createStoriesFromPosts = (postData: Post[]) => {
    const uniqueUsers = postData.slice(0, 5).map((post, index) => ({
      id: `story-${post.id}`,
      name: post.userName,
      image: post.userImage,
    }));

    // Add "Your Story" at the beginning
    return [
      {
        id: "0",
        name: "Your Story",
        image: "https://randomuser.me/api/portraits/women/44.jpg", // Default user image
      },
      ...uniqueUsers
    ];
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Set posts from sample data
    const convertedPosts = convertToPostItemFormat(postsData.slice(0, 5));
    setPosts(convertedPosts);
    
    // Create stories from posts
    const storyData = createStoriesFromPosts(postsData);
    setStories(storyData);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      loadData();
      setRefreshing(false);
      // Add some points for refreshing
      setPoints(prev => prev + 10);
    }, 1000);
  };

  const handleAddPress = () => {
    console.log("Add button pressed - would navigate to create post screen");
    // Add points for posting
    setPoints(prev => prev + 50);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    safeArea: {
      backgroundColor: colors.surface,
    },
    storyListContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
    },
  });

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <Header onAddPress={handleAddPress} points={points} />
        </SafeAreaView>

        <View style={styles.storyListContainer}>
          <StoryList stories={stories} />
        </View>
        
        <PostList
          posts={posts}
          onRefresh={handleRefresh}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaProvider>
  );
};

export default HomeScreen;