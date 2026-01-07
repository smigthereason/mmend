// PostList.tsx
import React from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Add this import
import PostItem from "./PostItem";
import { Post } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

interface PostListProps {
  posts: Post[];
  onRefresh?: () => void;
  refreshing?: boolean;
  emptyMessage?: string;
}

const PostList: React.FC<PostListProps> = ({ 
  posts, 
  onRefresh, 
  refreshing = false,
  emptyMessage = "No posts available" 
}) => {
  const { colors } = useTheme();

  const renderEmptyComponent = () => (
    <View style={[styles.emptyContainer, { backgroundColor: colors.background }]}>
      <Ionicons name="document-text-outline" size={64} color={colors.textSecondary} />
      <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
        {emptyMessage}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem post={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={posts.length === 0 && styles.emptyContent}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
  emptyContent: {
    flexGrow: 1,
  },
});

export default PostList;