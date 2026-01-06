import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import MessageItem from "./MessageItem";
import { Conversation } from "../shared/types";

interface MessageListProps {
  conversations: Conversation[];
  onConversationPress: (conversation: Conversation) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  conversations,
  onConversationPress,
}) => {
  return (
    <FlatList
      data={conversations}
      renderItem={({ item }) => (
        <MessageItem conversation={item} onPress={onConversationPress} />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
});

export default MessageList;