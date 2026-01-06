import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import MessageBubble from "./MessageBubble";
import { Message } from "../shared/types";

interface ChatListProps {
  messages: Message[];
}

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <MessageBubble message={item} />}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.messagesList}
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