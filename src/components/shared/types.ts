// Types for our components
export interface Story {
  id: string;
  name: string;
  image: string;
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

export interface Post {
  id: string;
  userId: string;
  userName: string;
  username: string;
  userImage: string;
  title: string;
  content: string;
  caption: string;
  category: 'Postpartum' | 'Breastfeeding' | 'Sleep' | 'Mental Health' | 'Recovery' | 'Support';
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  timestamp: string;
  time: string;
  readTime: string;
  postImage: string;
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
  onContentSizeChange?: (event: any) => void;
}