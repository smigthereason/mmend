// MessageList.tsx
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import MessageItem from "./MessageItem";
import { Conversation } from "../shared/types";
import { useTheme } from "../../context/ThemeContext";

interface MessageListProps {
  conversations: Conversation[];
  onConversationPress: (conversation: Conversation) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  conversations,
  onConversationPress,
}) => {
  const { colors } = useTheme();

  return (
    <FlatList
      data={conversations}
      renderItem={({ item }) => (
        <MessageItem conversation={item} onPress={onConversationPress} />
      )}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.listContent, { backgroundColor: colors.background }]}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20,
  },
});

export default MessageList;