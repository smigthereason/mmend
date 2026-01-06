import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Header from "../components/home/Header";
import StoryList from "../components/home/StoryList";
import PostList from "../components/home/PostList";
import { Story, Post } from "../components/shared/types";

// Mock data - could be moved to a separate data file
const storiesData: Story[] = [
  {
    id: "1",
    name: "Your Story",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: "2",
    name: "Emma",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "3",
    name: "Sophia",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: "4",
    name: "Olivia",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    id: "5",
    name: "Ava",
    image: "https://randomuser.me/api/portraits/women/7.jpg",
  },
];

const postsData: Post[] = [
  {
    id: "1",
    username: "motherhood_journey",
    userImage: "https://randomuser.me/api/portraits/women/1.jpg",
    postImage: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46",
    likes: 1234,
    caption: "Beautiful moments of motherhood ❤️ #motherhood #love",
    comments: 89,
    time: "2 hours ago",
  },
  {
    id: "2",
    username: "parenting_tips",
    userImage: "https://randomuser.me/api/portraits/women/2.jpg",
    postImage: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f47",
    likes: 567,
    caption: "Today's parenting tip: Always listen to your child! 👶 #parenting",
    comments: 45,
    time: "5 hours ago",
  },
  {
    id: "3",
    username: "family_first",
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    postImage: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f48",
    likes: 2345,
    caption: "Family is everything! 👨‍👩‍👧‍👦 #familytime #blessed",
    comments: 156,
    time: "1 day ago",
  },
];

const HomeScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [stories] = useState<Story[]>(storiesData);
  const [posts] = useState<Post[]>(postsData);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleAddPress = () => {
    console.log("Add button pressed");
    // Navigate to create post screen
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea} edges={["top"]}>
          <Header onAddPress={handleAddPress} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  safeArea: {
    backgroundColor: "white",
  },
});

export default HomeScreen;