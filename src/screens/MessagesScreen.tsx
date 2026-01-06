import React, { useState, useCallback, useMemo, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { Conversation } from "../components/shared/types";
import MessagesHeader from "../components/messages/MessagesHeader";
import SearchBar from "../components/messages/SearchBar";
import MessageList from "../components/messages/MessageList";
import * as ImagePicker from 'expo-image-picker';

// Mock conversations data
const initialConversationsData: Conversation[] = [
  {
    id: "1",
    userName: "Emma",
    userImage: "https://randomuser.me/api/portraits/women/1.jpg",
    lastMessage: "How's the little one doing? 👶",
    timestamp: "2 min ago",
    unreadCount: 3,
    isOnline: true,
    messageThread: [
      {
        id: "1",
        text: "Hey there! How's motherhood treating you?",
        time: "10:30 AM",
        isSent: false,
        isRead: true,
      },
      {
        id: "2",
        text: "It's been amazing! Exhausting but so rewarding 😊",
        time: "10:32 AM",
        isSent: true,
        isRead: true,
      },
      {
        id: "3",
        text: "How's the little one doing? 👶",
        time: "10:35 AM",
        isSent: false,
        isRead: false,
      },
    ],
  },
  {
    id: "2",
    userName: "Sophia",
    userImage: "https://randomuser.me/api/portraits/women/2.jpg",
    lastMessage: "Let's meet for coffee next week ☕",
    timestamp: "1 hr ago",
    unreadCount: 0,
    isOnline: true,
    messageThread: [
      {
        id: "1",
        text: "Coffee next week?",
        time: "Yesterday",
        isSent: false,
        isRead: true,
      },
      {
        id: "2",
        text: "Sounds perfect! Wednesday works for me",
        time: "Yesterday",
        isSent: true,
        isRead: true,
      },
      {
        id: "3",
        text: "Let's meet for coffee next week ☕",
        time: "1 hr ago",
        isSent: false,
        isRead: true,
      },
    ],
  },
  {
    id: "3",
    userName: "Dr. Johnson",
    userImage: "https://randomuser.me/api/portraits/men/1.jpg",
    lastMessage: "Your test results are in",
    timestamp: "3 hrs ago",
    unreadCount: 1,
    isOnline: false,
    messageThread: [
      {
        id: "1",
        text: "Your test results are ready",
        time: "9:00 AM",
        isSent: false,
        isRead: true,
      },
      {
        id: "2",
        text: "Great! What do they say?",
        time: "10:00 AM",
        isSent: true,
        isRead: true,
      },
      {
        id: "3",
        text: "Your test results are in",
        time: "3 hrs ago",
        isSent: false,
        isRead: false,
      },
    ],
  },
  {
    id: "4",
    userName: "Michael",
    userImage: "https://randomuser.me/api/portraits/men/2.jpg",
    lastMessage: "Don't forget about the meeting tomorrow",
    timestamp: "Yesterday",
    unreadCount: 2,
    isOnline: true,
    messageThread: [
      {
        id: "1",
        text: "Meeting tomorrow at 2 PM",
        time: "Yesterday",
        isSent: false,
        isRead: false,
      },
      {
        id: "2",
        text: "Don't forget about the meeting tomorrow",
        time: "Yesterday",
        isSent: false,
        isRead: false,
      },
    ],
  },
];

interface MessagesScreenProps {
  navigation: any;
  route?: any;
}

const MessagesScreen: React.FC<MessagesScreenProps> = ({ navigation, route }) => {
  const [searchText, setSearchText] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>(initialConversationsData);

  // Calculate total unread count
  const totalUnreadCount = useMemo(() => {
    return conversations.reduce((total, conversation) => total + conversation.unreadCount, 0);
  }, [conversations]);

  // Update badge when unread count changes
  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: totalUnreadCount > 0 ? totalUnreadCount : undefined,
    });
  }, [totalUnreadCount, navigation]);

  // Handle conversation press - mark as read
  const handleConversationPress = useCallback((conversation: Conversation) => {
    console.log("Opening conversation with:", conversation.userName);
    
    // Update conversation with messages marked as read
    const updatedConversations = conversations.map(conv => 
      conv.id === conversation.id 
        ? { 
            ...conv, 
            unreadCount: 0,
            messageThread: conv.messageThread.map(msg => ({ ...msg, isRead: true }))
          } 
        : conv
    );
    
    setConversations(updatedConversations);
    
    navigation.navigate("ChatScreen", { 
      conversation: {
        ...conversation,
        unreadCount: 0,
        messageThread: conversation.messageThread.map(msg => ({ ...msg, isRead: true }))
      }
    });
  }, [conversations, navigation]);

  // Handle camera press - open camera
  const handleCameraPress = async () => {
    console.log("Opening camera from message screen");
    
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "Camera permission is required to take photos.");
      return;
    }
    
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    
    if (!result.canceled) {
      console.log("Camera photo taken:", result.assets[0].uri);
      Alert.alert(
        "Photo Taken",
        "Would you like to send this photo to a contact?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Send to New Chat", 
            onPress: () => {
              Alert.prompt(
                "New Chat with Photo",
                "Enter contact name to send photo to:",
                [
                  { text: "Cancel", style: "cancel" },
                  { 
                    text: "Create", 
                    onPress: (name) => {
                      if (name && name.trim()) {
                        handleComposePress(name.trim(), result.assets[0].uri);
                      }
                    }
                  }
                ]
              );
            }
          }
        ]
      );
    }
  };

  // Handle compose press - start new conversation
  const handleComposePress = (prefilledName?: string, photoUri?: string) => {
    Alert.prompt(
      "New Conversation",
      "Enter the name of the person you want to message:",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Create", 
          onPress: (name) => {
            const contactName = prefilledName || (name ? name.trim() : "");
            if (contactName) {
              const newConversation: Conversation = {
                id: Date.now().toString(),
                userName: contactName,
                userImage: `https://ui-avatars.com/api/?name=${encodeURIComponent(contactName)}&background=random`,
                lastMessage: photoUri ? "Sent a photo 📷" : "Say hello! 👋",
                timestamp: "Just now",
                unreadCount: 0,
                isOnline: true,
                messageThread: photoUri ? [
                  {
                    id: Date.now().toString(),
                    text: "📷 Photo",
                    time: "Just now",
                    isSent: true,
                    isRead: false,
                  }
                ] : [],
              };
              
              setConversations(prev => [newConversation, ...prev]);
              handleConversationPress(newConversation);
              
              if (photoUri) {
                Alert.alert("Success", `Photo sent to ${contactName}!`);
              }
            }
          }
        }
      ],
      'plain-text',
      prefilledName || ''
    );
  };

  // Filter conversations based on search
  const filteredConversations = useMemo(() => {
    if (!searchText.trim()) return conversations;
    
    const searchLower = searchText.toLowerCase();
    return conversations.filter(conv => 
      conv.userName.toLowerCase().includes(searchLower) ||
      conv.lastMessage.toLowerCase().includes(searchLower)
    );
  }, [conversations, searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <MessagesHeader 
        onCameraPress={handleCameraPress}
        onComposePress={() => handleComposePress()}
      />
      
      <SearchBar 
        value={searchText}
        onChangeText={setSearchText}
      />

      <MessageList 
        conversations={filteredConversations}
        onConversationPress={handleConversationPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default MessagesScreen;