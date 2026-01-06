// MessageBubble.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MessageBubbleProps } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { colors } = useTheme();

  const sentBubbleColor = colors.primary; // Use pink for sent messages
  const receivedBubbleColor = colors.background === '#121212' ? '#333333' : '#f0f0f0';

  return (
    <View style={[
      styles.messageBubble,
      message.isSent ? 
        [styles.sentBubble, { backgroundColor: sentBubbleColor }] : 
        [styles.receivedBubble, { backgroundColor: receivedBubbleColor }]
    ]}>
      <Text style={[
        styles.messageText,
        message.isSent ? 
          [styles.sentText, { color: 'white' }] : 
          [styles.receivedText, { color: colors.text }]
      ]}>
        {message.text}
      </Text>
      <View style={styles.messageMeta}>
        <Text style={[
          styles.messageTime, 
          { color: message.isSent ? 'rgba(255, 255, 255, 0.7)' : colors.textMuted }
        ]}>
          {message.time}
        </Text>
        {message.isSent && (
          <Ionicons 
            name={message.isRead ? "checkmark-done" : "checkmark"} 
            size={14} 
            color={message.isRead ? 'white' : 'rgba(255, 255, 255, 0.7)'} 
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
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  receivedBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
  },
  sentText: {},
  receivedText: {},
  messageMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 4,
  },
  messageTime: {
    fontSize: 12,
    marginRight: 4,
  },
  readIndicator: {
    marginLeft: 4,
  },
});

export default MessageBubble;