// types.ts
// Types for our components

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
  userImage: string;
  title: string;
  content: string;
  category: 'Postpartum' | 'Breastfeeding' | 'Sleep' | 'Mental Health' | 'Recovery' | 'Support';
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
  timestamp: string;
  readTime: string;
  postImage?: string;
}

export interface PostHeaderProps {
  username: string;
  userImage: string;
  time: string;
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

// Story Types
export interface StoryContent {
  id: string;
  type: 'image' | 'video';
  url: string;
  duration: number; // in seconds
  seen: boolean;
  postedAt: string;
  text?: string; // optional text overlay
}

export interface UserStory {
  id: string;
  userId: string;
  name: string;
  image: string;
  hasUnseen: boolean;
  stories: StoryContent[];
  seenStories: number; // how many stories have been seen
}

// For backward compatibility with existing code
export type Story = UserStory;

export interface UserStoryItemProps {
  story: UserStory;
  isYourStory?: boolean; // Change from isFirst
  onPress: () => void;
}
export interface UserStoryItemProps {
  story: UserStory;
  isYourStory?: boolean;
  onPress: () => void;
}
export interface StoryListProps {
  stories: UserStory[];
  onStoryPress: (index: number) => void;
  onCreateStory?: () => void;
}
export interface StoriesViewerProps {
  stories: UserStory[];
  initialIndex: number;
  onClose: () => void;
  onStorySeen: (userId: string, storyIndex: number) => void;
}

export interface StoryProgressBarProps {
  index: number;
  currentIndex: number;
  totalStories: number;
  storyDurations: number[];
  paused: boolean;
}

export interface StoryHeaderProps {
  user: UserStory;
  currentTime: string;
  onClose: () => void;
}



export interface StoryListProps {
  stories: UserStory[];
  onStoryPress: (index: number) => void;
  onCreateStory?: () => void;
}