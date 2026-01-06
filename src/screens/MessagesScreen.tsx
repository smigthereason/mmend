import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import { Conversation } from "../components/shared/types";
import MessagesHeader from "../components/messages/MessagesHeader";
import SearchBar from "../components/messages/SearchBar";
import MessageList from "../components/messages/MessageList";
import { conversationsData } from "../data/conversations";
import { useTheme } from "../context/ThemeContext";

interface MessagesScreenProps {
  navigation: any;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>(conversationsData);

  const handleConversationPress = (conversation: Conversation) => {
    console.log("Navigating to ChatScreen with:", conversation.userName);
    navigation.navigate("ChatScreen", { conversation });
  };

  const handleCameraPress = () => {
    console.log("Camera pressed");
  };

  const handleComposePress = () => {
    console.log("Compose new message");
    // Navigate to new message screen
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv =>
    conv.userName.toLowerCase().includes(searchText.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    emptyText: {
      fontSize: 16,
      color: colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <MessagesHeader 
        onCameraPress={handleCameraPress}
        onComposePress={handleComposePress}
      />
      
      <SearchBar 
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Search conversations..."
      />

      <MessageList 
        conversations={filteredConversations}
        onConversationPress={handleConversationPress}
      />
      
      {/* Debug indicator - can remove in production */}
      {conversations.length === 0 && (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No conversations yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MessagesScreen;