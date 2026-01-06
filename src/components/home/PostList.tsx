import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import PostItem from "./PostItem";
import { Post } from "../shared/types";

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
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostItem post={item} />}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  // Add any container styles if needed
});

export default PostList;