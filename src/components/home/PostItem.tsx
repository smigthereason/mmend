// PostItem.tsx
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostItemProps } from "../shared/types";
import PostHeader from "./PostHeader";
import { useTheme } from "../../context/ThemeContext";

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  const { colors } = useTheme();
  const [liked, setLiked] = React.useState(post.isLiked);
  const [saved, setSaved] = React.useState(post.isSaved);
  const [likeCount, setLikeCount] = React.useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <View
      style={[
        styles.postContainer,
        {
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <PostHeader
        username={post.userName}
        userImage={post.userImage}
        time={post.timestamp}
      />
      {/* Post Image (if available) */}
      {post.postImage && (
        <Image
          source={{ uri: post.postImage }}
          style={styles.postImage}
          resizeMode="cover"
        />
      )}

      {/* Post Title */}
      <Text style={[styles.postTitle, { color: colors.text }]}>
        {post.title}
      </Text>

      {/* Post Content */}
      <Text style={[styles.postContent, { color: colors.text }]}>
        {post.content}
      </Text>

      {/* Tags */}
      <View style={styles.tagsContainer}>
        {post.tags.map((tag, index) => (
          <View
            key={index}
            style={[styles.tag, { backgroundColor: colors.primary + "20" }]}
          >
            <Text style={[styles.tagText, { color: colors.primary }]}>
              #{tag}
            </Text>
          </View>
        ))}
      </View>

      {/* Post Info */}
      <View style={[styles.postInfo, { borderTopColor: colors.border }]}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons
              name="time-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {post.readTime}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons
              name="chatbubble-outline"
              size={16}
              color={colors.textSecondary}
            />
            <Text style={[styles.infoText, { color: colors.textSecondary }]}>
              {post.category}
            </Text>
          </View>
        </View>
      </View>

      {/* Post Actions */}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={28}
            color={liked ? "#ff3040" : colors.text}
          />
          <Text
            style={[
              styles.actionCount,
              { color: liked ? "#ff3040" : colors.text },
            ]}
          >
            {likeCount.toLocaleString()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="chatbubble-outline" size={26} color={colors.text} />
          <Text style={[styles.actionCount, { color: colors.text }]}>
            {post.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={26} color={colors.text} />
          <Text style={[styles.actionCount, { color: colors.text }]}>
            {post.shares}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={26}
            color={colors.text}
          />
        </TouchableOpacity>
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
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 8,
  },
  postContent: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  postImage: {
    width: "100%",
    height: 300,
    marginVertical: 10,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
    paddingBottom: 12,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  postInfo: {
    borderTopWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 12,
    marginTop: 8,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    marginLeft: 6,
  },
  postActions: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 12,
    alignItems: "center",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  actionCount: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  saveButton: {
    marginLeft: "auto",
  },
});

export default PostItem;
