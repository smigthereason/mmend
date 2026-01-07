// Update HomeScreen.tsx
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/home/Header";
import StoryList from "../components/stories/StoryList"; // Updated import
import PostList from "../components/home/PostList";
import { UserStory, Post } from "../components/shared/types";
import { postsData } from "../data/posts";
import { useTheme } from "../context/ThemeContext";

// Sample stories data
const sampleStories: UserStory[] = [
  {
    id: "0",
    userId: "user0",
    name: "Your Story",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    hasUnseen: false,
    seenStories: 0,
    stories: [
      {
        id: "story0-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=870&auto=format&fit=crop",
        duration: 5,
        seen: false,
        postedAt: "Just now",
      },
    ],
  },
  {
    id: "1",
    userId: "user1",
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1496302912295-8d0451c184e2?q=80&w=876&auto=format&fit=crop",
    hasUnseen: true,
    seenStories: 0,
    stories: [
      {
        id: "story1-1",
        type: "image",
        url: "https://images.unsplash.com/photo-1584697964401-a8e6c6d93d2d?q=80&w=774&auto=format&fit=crop",
        duration: 5,
        seen: false,
        postedAt: "2 hours ago",
      },
    ],
  },
  // Add more stories...
];

interface HomeScreenProps {
  navigation?: any; // Add navigation prop
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [stories, setStories] = useState<UserStory[]>(sampleStories);
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [points, setPoints] = useState(1578);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Set posts from sample data
    setPosts(postsData);
    // Set stories from sample data
    setStories(sampleStories);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      loadData();
      setRefreshing(false);
      setPoints(prev => prev + 10);
    }, 1000);
  };

  const handleAddPress = () => {
    console.log("Add button pressed");
    setPoints(prev => prev + 50);
  };

  const handleAddStory = () => {
    console.log("Add story pressed");
    // Navigate to create story screen or camera
  };

  const handleStoryPress = (index: number) => {
  // Navigate to StoriesScreen
  navigation?.navigate("Stories", { initialIndex: index });
};

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
            onStoryPress={handleAddStory}
          />
        </SafeAreaView>

        <StoryList 
          stories={stories} 
          onStoryPress={handleStoryPress}
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