// PostHeader.tsx
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PostHeaderProps } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

const PostHeader: React.FC<PostHeaderProps> = ({ username, userImage, time }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.postHeader, { backgroundColor: colors.surface }]}>
      <Image source={{ uri: userImage }} style={styles.userImage} />
      <View style={styles.userInfo}>
        <Text style={[styles.username, { color: colors.text }]}>{username}</Text>
        <Text style={[styles.postTime, { color: colors.textMuted }]}>{time}</Text>
      </View>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="ellipsis-horizontal" size={24} color={colors.text} />
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
  },
  menuButton: {
    padding: 5,
  },
});

export default PostHeader;