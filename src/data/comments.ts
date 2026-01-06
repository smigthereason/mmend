export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
  likes: number;
  timestamp: string;
  isLiked: boolean;
  replies?: Comment[];
}

export const commentsData: Comment[] = [
  {
    id: 'comment1',
    postId: '1',
    userId: 'user20',
    userName: 'Jessica Park',
    userImage: 'https://randomuser.me/api/portraits/women/22.jpg',
    content: 'Thank you for sharing this. I\'m going through the exact same thing at 8 weeks postpartum. Reading your story gives me hope.',
    likes: 24,
    timestamp: '1 hour ago',
    isLiked: true,
    replies: [
      {
        id: 'reply1',
        postId: '1',
        userId: 'user1',
        userName: 'Sarah Johnson',
        userImage: 'https://randomuser.me/api/portraits/women/32.jpg',
        content: 'You\'re so welcome, Jessica. Please reach out if you need to talk. The first step is always the hardest.',
        likes: 8,
        timestamp: '45 min ago',
        isLiked: false
      }
    ]
  },
  {
    id: 'comment2',
    postId: '1',
    userId: 'user21',
    userName: 'Dr. Lisa Chen',
    userImage: 'https://randomuser.me/api/portraits/women/26.jpg',
    content: 'As a postpartum psychiatrist, I want to commend you for sharing your story. This helps normalize seeking help.',
    likes: 42,
    timestamp: '2 hours ago',
    isLiked: false
  },
  // Add more comments...
];