export interface Story {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  title: string;
  content: string;
  challenge: string;
  solution: string;
  outcome: string;
  advice: string;
  tags: string[];
  datePosted: string;
  resources?: string[];
  quote?: string;
}

export const storiesData: Story[] = [
  {
    id: 'story1',
    userId: 'user1',
    userName: 'Sarah Johnson',
    userImage: 'https://randomuser.me/api/portraits/women/32.jpg',
    title: 'From Darkness to Light: My PPD Journey',
    content: 'The first three months after Emma was born were the darkest of my life. I would sit in the nursery, holding my beautiful daughter, and feel absolutely nothing. The guilt was overwhelming - how could I not feel joy when I had this perfect little human?',
    challenge: 'Severe postpartum depression, disconnection from baby, constant crying spells, feeling of worthlessness',
    solution: 'Reached out to my OBGYN at 3 months postpartum, started therapy twice a week, joined a support group, began medication, and asked for help from family',
    outcome: 'After 2 months of treatment, I started feeling glimmers of joy. At 6 months, I felt bonded with Emma. Today, we have the most beautiful relationship.',
    advice: 'Don\'t wait to ask for help. The "baby blues" that lasts beyond 2 weeks is not normal. Your mental health matters as much as your physical health.',
    tags: ['PPD', 'Recovery', 'Therapy', 'Medication'],
    datePosted: 'March 15, 2024',
    resources: [
      'Postpartum Support International: 1-800-944-4773',
      'Therapy apps: BetterHelp, TalkSpace',
      'Book: "This Isn\'t What I Expected" by Karen Kleiman'
    ],
    quote: '"Asking for help isn\'t weakness - it\'s the bravest thing a mother can do."'
  },
  {
    id: 'story2',
    userId: 'user2',
    userName: 'Maria Rodriguez',
    userImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    title: 'The Breastfeeding Battle I Almost Lost',
    content: 'Every feeding session felt like torture. I dreaded my baby\'s hunger cues because I knew what was coming - excruciating pain, frustration, and feelings of inadequacy.',
    challenge: 'Extreme pain during breastfeeding, cracked and bleeding nipples, low milk supply anxiety, pressure to continue',
    solution: 'Hired a lactation consultant, switched to pumping temporarily to heal, used nipple shields, joined a breastfeeding support group online',
    outcome: 'After 8 weeks of struggle, we found our rhythm. I was able to breastfeed for 14 months. The pain eventually became a distant memory.',
    advice: 'Fed is best. Whether it\'s breast, bottle, or formula - what matters is that your baby is nourished and you\'re mentally healthy.',
    tags: ['Breastfeeding', 'Pain', 'Support', 'Persistence'],
    datePosted: 'February 28, 2024',
    resources: [
      'La Leche League International',
      'KellyMom breastfeeding resources',
      'Lactation consultants through insurance'
    ]
  },
  // Add more stories...
];

// Extended version with all 15 stories (truncated for brevity here)