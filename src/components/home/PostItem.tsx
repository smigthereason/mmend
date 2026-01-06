import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostItemProps } from "../shared/types";
import PostHeader from "./PostHeader";

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <View style={styles.postContainer}>
      <PostHeader 
        username={post.username}
        userImage={post.userImage}
        time={post.time}
      />

      <Image source={{ uri: post.postImage }} style={styles.postImage} />

      <View style={styles.postActions}>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name="chatbubble-outline" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionIcon}>
          <Ionicons name="paper-plane-outline" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveIcon}>
          <Ionicons name="bookmark-outline" size={26} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.postContent}>
        <Text style={styles.likes}>{post.likes.toLocaleString()} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.username} </Text>
          {post.caption}
        </Text>
        <TouchableOpacity>
          <Text style={styles.viewComments}>
            View all {post.comments} comments
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
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
    marginBottom: 5,
  },
  username: {
    fontWeight: "bold",
  },
  caption: {
    marginBottom: 5,
  },
  viewComments: {
    color: "gray",
    marginBottom: 10,
  },
});

export default PostItem;