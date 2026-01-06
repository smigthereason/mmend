// MessageItem.tsx
import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MessageItemProps } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

const MessageItem: React.FC<MessageItemProps> = ({ conversation, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.messageItem, { 
        borderBottomColor: colors.border,
        backgroundColor: colors.surface 
      }]}
      onPress={() => onPress(conversation)}
    >
      <View style={styles.userImageContainer}>
        <Image source={{ uri: conversation.userImage }} style={styles.userImage} />
        {conversation.isOnline && (
          <View style={[styles.onlineIndicator, { backgroundColor: '#4CAF50' }]} />
        )}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={[styles.userName, { color: colors.text }]}>{conversation.userName}</Text>
          <Text style={[styles.timestamp, { color: colors.textMuted }]}>{conversation.timestamp}</Text>
        </View>
        <Text 
          style={[
            styles.lastMessage, 
            { color: colors.textSecondary },
            conversation.unreadCount > 0 && [styles.unreadMessage, { color: colors.text }]
          ]}
          numberOfLines={1}
        >
          {conversation.lastMessage}
        </Text>
      </View>
      
      {conversation.unreadCount > 0 && (
        <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]}>
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
  },
  lastMessage: {
    fontSize: 14,
  },
  unreadMessage: {
    fontWeight: "bold",
  },
  unreadBadge: {
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