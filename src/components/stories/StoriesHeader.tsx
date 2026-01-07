// StoriesHeader.tsx
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StoryHeaderProps } from "../shared/types";

const StoriesHeader: React.FC<StoryHeaderProps> = ({
  user,
  currentTime,
  onClose,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image source={{ uri: user.image }} style={styles.userImage} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.time}>{currentTime}</Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 16,
    borderBottomWidth: 1
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#fff",
  },
  userDetails: {
    marginLeft: 10,
  },
  userName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  time: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginTop: 2,
  },
  closeButton: {
    padding: 5,
  },
});

export default StoriesHeader;