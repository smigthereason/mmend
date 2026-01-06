import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MessageBubbleProps } from "../shared/types";

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  return (
    <View style={[
      styles.messageBubble,
      message.isSent ? styles.sentBubble : styles.receivedBubble
    ]}>
      <Text style={[
        styles.messageText,
        message.isSent ? styles.sentText : styles.receivedText
      ]}>
        {message.text}
      </Text>
      <View style={styles.messageMeta}>
        <Text style={styles.messageTime}>{message.time}</Text>
        {message.isSent && (
          <Ionicons 
            name={message.isRead ? "checkmark-done" : "checkmark"} 
            size={14} 
            color={message.isRead ? "#3897f0" : "#999"} 
            style={styles.readIndicator}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 18,
    marginBottom: 10,
  },
  sentBubble: {
    backgroundColor: "#3897f0",
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {
    color: "white",
  },
  receivedText: {
    color: "black",
  },
  messageMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    marginRight: 4,
    color: "rgba(15, 14, 14, 0.7)",
  },
  readIndicator: {
    marginLeft: 4,
  },
});

export default MessageBubble;