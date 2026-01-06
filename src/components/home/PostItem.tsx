// PostItem.tsx
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostItemProps } from "../shared/types";
import PostHeader from "./PostHeader";
import { useTheme } from "../../context/ThemeContext";

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { colors } = useTheme();
  const [liked, setLiked] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <View style={[styles.postContainer, { 
      backgroundColor: colors.surface,
      borderBottomColor: colors.border 
    }]}>
      <PostHeader 
        username={post.username}
        userImage={post.userImage}
        time={post.time}
      />

      <Image source={{ uri: post.postImage }} style={styles.postImage} resizeMode="cover" />

      <View style={styles.postActions}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={28} 
            color={liked ? "#ff3040" : colors.text} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name="chatbubble-outline" size={26} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name="paper-plane-outline" size={26} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveIcon} onPress={handleSave}>
          <Ionicons 
            name={saved ? "bookmark" : "bookmark-outline"} 
            size={26} 
            color={colors.text} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <Text style={[styles.likes, { color: colors.text }]}>
          {likeCount.toLocaleString()} likes
        </Text>
        <Text style={[styles.caption, { color: colors.text }]}>
          <Text style={[styles.username, { color: colors.text }]}>{post.username} </Text>
          {post.caption}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.viewComments, { color: colors.textSecondary }]}>
            View all {post.comments} comments
          </Text>
        </TouchableOpacity>
        <Text style={[styles.timestamp, { color: colors.textMuted }]}>{post.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 15,
  },
  postImage: {
    width: "100%",
    height: 400,
  },
  postActions: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  actionIcon: {
    marginLeft: 15,
  },
  saveIcon: {
    marginLeft: "auto",
  },
  postContent: {
    paddingHorizontal: 10,
  },
  likes: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 14,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  caption: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 18,
  },
  viewComments: {
    marginBottom: 5,
    fontSize: 14,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default PostItem;