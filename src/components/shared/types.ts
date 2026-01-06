// Types for our components
export interface Story {
  id: string;
  name: string;
  image: string;
}

export interface Post {
  id: string;
  username: string;
  userImage: string;
  postImage: string;
  likes: number;
  caption: string;
  comments: number;
  time: string;
}

export interface PostHeaderProps {
  username: string;
  userImage: string;
  time: string;
}

export interface StoryItemProps {
  story: Story;
}

export interface PostItemProps {
  post: Post;
}
// Add these to your existing types.ts
export interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  userName: string;
  userImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messageThread: Message[];
}

export interface MessageItemProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}

export interface ChatHeaderProps {
  userName: string;
  userImage: string;
  isOnline: boolean;
  onBackPress: () => void;
}

export interface MessageBubbleProps {
  message: Message;
}

export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
}

export interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  userName: string;
  userImage: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messageThread: Message[];
}

export interface ChatHeaderProps {
  userName: string;
  userImage: string;
  isOnline: boolean;
  onBackPress: () => void;
}

export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
}

export interface MessageBubbleProps {
  message: Message;
}

export interface MessageItemProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}
export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
  onContentSizeChange?: (event: any) => void; // Add this
}
// Add these interfaces if they don't exist
export interface ChatHeaderProps {
  userName: string;
  userImage: string;
  isOnline: boolean;
  onBackPress: () => void;
}

export interface ChatInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSendPress: () => void;
}

export interface MessageBubbleProps {
  message: Message;
}

export interface MessageItemProps {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
}