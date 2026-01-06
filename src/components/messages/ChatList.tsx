// ChatList.tsx
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import MessageBubble from "./MessageBubble";
import { Message } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

interface ChatListProps {
  messages: Message[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageBubble message={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={[styles.messagesList, { backgroundColor: colors.background }]}
      inverted={false}
    />
  );
};

const styles = StyleSheet.create({
  messagesList: {
    padding: 15,
  },
});

export default ChatList;