import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ChatHeaderProps } from "../shared/types";

const ChatHeader: React.FC<ChatHeaderProps> = ({
  userName,
  userImage,
  isOnline,
  onBackPress,
}) => {
  return (
    <View style={styles.chatHeader}>
      <TouchableOpacity onPress={onBackPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.chatUserInfo}>
        <Image source={{ uri: userImage }} style={styles.chatUserImage} />
        <View>
          <Text style={styles.chatUserName}>{userName}</Text>
          <Text style={styles.chatUserStatus}>
            {isOnline ? "Online" : "Last seen recently"}
          </Text>
        </View>
      </TouchableOpacity>
      
      <View style={styles.chatHeaderIcons}>
        <TouchableOpacity>
          <Ionicons name="videocam" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="call" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 45,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: 'white',
  },
  chatUserInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  chatUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatUserName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatUserStatus: {
    fontSize: 12,
    color: "gray",
  },
  chatHeaderIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIcon: {
    marginHorizontal: 15,
  },
});

export default ChatHeader;