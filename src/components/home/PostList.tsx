// PostList.tsx
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PostItem from "./PostItem";
import { Post } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

interface PostListProps {
  posts: Post[];
  onRefresh?: () => void;
  refreshing?: boolean;
}

const PostList: React.FC<PostListProps> = ({ 
  posts, 
  onRefresh, 
  refreshing = false 
}) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem post={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ backgroundColor: colors.background }}
    />
  );
};

export default PostList;