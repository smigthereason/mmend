import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostHeaderProps } from "../shared/types";

const PostHeader: React.FC<PostHeaderProps> = ({ username, userImage, time }) => {
  return (
    <View style={styles.postHeader}>
      <Image source={{ uri: userImage }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.postTime}>{time}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userInfo: {
    marginLeft: 10,
    flex: 1,
  },
  username: {
    fontWeight: "bold",
  },
  postTime: {
    fontSize: 12,
    color: "gray",
  },
  menuButton: {
    padding: 5,
  },
});

export default PostHeader;