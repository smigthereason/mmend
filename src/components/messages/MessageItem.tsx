import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MessageItemProps } from "../shared/types";

const MessageItem: React.FC<MessageItemProps> = ({ conversation, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.messageItem} 
      onPress={() => onPress(conversation)}
    >
      <View style={styles.userImageContainer}>
        <Image source={{ uri: conversation.userImage }} style={styles.userImage} />
        {conversation.isOnline && <View style={styles.onlineIndicator} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.userName}>{conversation.userName}</Text>
          <Text style={styles.timestamp}>{conversation.timestamp}</Text>
        </View>
        <Text 
          style={[
            styles.lastMessage, 
            conversation.unreadCount > 0 && styles.unreadMessage
          ]}
          numberOfLines={1}
        >
          {conversation.lastMessage}
        </Text>
      </View>
      
      {conversation.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{conversation.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  userImageContainer: {
    position: "relative",
    marginRight: 12,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "white",
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    fontSize: 12,
    color: "gray",
  },
  lastMessage: {
    fontSize: 14,
    color: "gray",
  },
  unreadMessage: {
    fontWeight: "bold",
    color: "black",
  },
  unreadBadge: {
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  unreadText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default MessageItem;