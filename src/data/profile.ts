export interface UserProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  coverImage: string;
  bio: string;
  location: string;
  babyAge: string;
  babyName: string;
  babyGender: 'Boy' | 'Girl' | 'Prefer not to say';
  joinedDate: string;
  points: number;
  badges: Badge[];
  stats: UserStats;
  interests: string[];
  recentActivity: Activity[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
}

export interface UserStats {
  posts: number;
  comments: number;
  likesReceived: number;
  helpedOthers: number;
  streak: number;
}

export interface Activity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'badge' | 'consultation';
  title: string;
  description: string;
  timestamp: string;
}

export const userProfile: UserProfile = {
  id: 'user123',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  image: 'https://randomuser.me/api/portraits/women/32.jpg',
  coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
  bio: 'New mom navigating postpartum life. Passionate about mental health awareness and supporting other mothers.',
  location: 'San Francisco, CA',
  babyAge: '3 months',
  babyName: 'Emma',
  babyGender: 'Girl',
  joinedDate: 'March 2024',
  points: 1578,
  badges: [
    {
      id: '1',
      name: 'First Post',
      description: 'Shared your first story',
      icon: '✍️',
      earnedDate: '2 months ago'
    },
    {
      id: '2',
      name: 'Helper',
      description: 'Helped 10+ other moms',
      icon: '🤝',
      earnedDate: '1 month ago'
    },
    {
      id: '3',
      name: 'Community Star',
      description: 'Active for 30 consecutive days',
      icon: '⭐',
      earnedDate: '2 weeks ago'
    },
    {
      id: '4',
      name: 'Open Book',
      description: 'Shared 5+ personal stories',
      icon: '📖',
      earnedDate: '1 week ago'
    }
  ],
  stats: {
    posts: 8,
    comments: 42,
    likesReceived: 189,
    helpedOthers: 15,
    streak: 24
  },
  interests: [
    'Postpartum Support',
    'Breastfeeding',
    'Mental Health',
    'Sleep Training',
    'Self-Care'
  ],
  recentActivity: [
    {
      id: '1',
      type: 'post',
      title: 'Shared a new story',
      description: 'My Journey Through Postpartum Depression',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      type: 'comment',
      title: 'Commented on a post',
      description: 'Replied to "Sleep Deprivation Tips"',
      timestamp: '5 hours ago'
    },
    {
      id: '3',
      type: 'badge',
      title: 'Earned a new badge',
      description: 'Community Star - Active for 30 days',
      timestamp: '2 days ago'
    },
    {
      id: '4',
      type: 'consultation',
      title: 'Booked a consultation',
      description: 'With Dr. Samantha Williams',
      timestamp: '3 days ago'
    },
    {
      id: '5',
      type: 'like',
      title: 'Received 50+ likes',
      description: 'On "Finding My Village" post',
      timestamp: '1 week ago'
    }
  ]
};