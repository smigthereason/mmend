import React, { useState, useEffect } from "react";
import { 
  View, 
  SafeAreaView, 
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Message } from "../components/shared/types";
import ChatHeader from "../components/messages/ChatHeader";
import ChatList from "../components/messages/ChatList";
import ChatInput from "../components/messages/ChatInput";
import { useTheme } from "../context/ThemeContext";

interface ChatScreenProps {
  route: any;
  navigation: any;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { conversation } = route.params;
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>(conversation.messageThread);
  const [unreadCount, setUnreadCount] = useState(conversation.unreadCount);

  // Update header and badge when messages change
  useEffect(() => {
    // Calculate unread messages from others
    const otherUnread = messages.filter(msg => !msg.isSent && !msg.isRead).length;
    setUnreadCount(otherUnread);
    
    // Update navigation badge
    navigation.getParent()?.setOptions({
      tabBarBadge: otherUnread > 0 ? otherUnread : undefined,
    });

    navigation.setParams({
      conversation: {
        ...conversation,
        messageThread: messages,
        unreadCount: otherUnread
      }
    });
  }, [messages]);

  const handleSendPress = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        time: "Just now",
        isSent: true,
        isRead: true, // Sent messages are immediately read by sender
      };
      
      setMessages([...messages, newMessage]);
      setInputText("");
      
      // Simulate reply after 1 second
      setTimeout(() => {
        const replyMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thanks for your message! I'll get back to you soon.",
          time: "Just now",
          isSent: false,
          isRead: false, // This will show as unread
        };
        setMessages(prev => [...prev, replyMessage]);
        
        // Update badge to show unread message
        navigation.getParent()?.setOptions({
          tabBarBadge: 1,
        });
      }, 1000);
    }
  };

  const handleBackPress = () => {
    // Pass back the updated messages
    navigation.navigate({
      name: 'MessagesList',
      params: { 
        updatedConversation: {
          ...conversation,
          messageThread: messages,
          unreadCount: unreadCount
        }
      },
      merge: true
    });
  };

  // Mark all messages as read when entering chat
  useEffect(() => {
    const markAsRead = () => {
      const readMessages = messages.map(msg => ({ ...msg, isRead: true }));
      setMessages(readMessages);
    };
    
    markAsRead();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    keyboardAvoidingView: {
      flex: 1,
    },
    chatContent: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader 
        userName={conversation.userName}
        userImage={conversation.userImage}
        isOnline={conversation.isOnline}
        onBackPress={handleBackPress}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.chatContent}>
            <ChatList messages={messages} />
            
            <ChatInput 
              value={inputText}
              onChangeText={setInputText}
              onSendPress={handleSendPress}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;