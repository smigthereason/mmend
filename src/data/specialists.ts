export interface Specialist {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  rating: number;
  reviewCount: number;
  tier: 'Gold' | 'Silver' | 'Bronze';
  experience: string;
  languages: string[];
  consultationFee: number;
  available: boolean;
  nextAvailable: string;
}

export const specialistsData: Specialist[] = [
  {
    id: '1',
    name: 'Dr. Samantha Williams',
    title: 'Postpartum Psychiatrist',
    specialty: 'Postpartum Depression & Anxiety',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4.9,
    reviewCount: 247,
    tier: 'Gold',
    experience: '15+ years',
    languages: ['English', 'Spanish'],
    consultationFee: 200,
    available: true,
    nextAvailable: 'Tomorrow 10 AM'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    title: 'Lactation Consultant MD',
    specialty: 'Breastfeeding Support',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.8,
    reviewCount: 189,
    tier: 'Gold',
    experience: '12 years',
    languages: ['English', 'Mandarin'],
    consultationFee: 180,
    available: true,
    nextAvailable: 'Today 3 PM'
  },
  {
    id: '3',
    name: 'Lisa Rodriguez',
    title: 'Postpartum Doula',
    specialty: 'Newborn Care & Recovery',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    rating: 4.7,
    reviewCount: 156,
    tier: 'Silver',
    experience: '8 years',
    languages: ['English', 'Spanish'],
    consultationFee: 120,
    available: false,
    nextAvailable: 'Next Week'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    title: 'Sleep Specialist',
    specialty: 'Infant Sleep Training',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4.6,
    reviewCount: 134,
    tier: 'Silver',
    experience: '10 years',
    languages: ['English'],
    consultationFee: 150,
    available: true,
    nextAvailable: 'Friday 11 AM'
  },
  {
    id: '5',
    name: 'Sarah Johnson',
    title: 'PPD Support Counselor',
    specialty: 'Mental Health Support',
    image: 'https://randomuser.me/api/portraits/women/28.jpg',
    rating: 4.5,
    reviewCount: 98,
    tier: 'Bronze',
    experience: '5 years',
    languages: ['English'],
    consultationFee: 90,
    available: true,
    nextAvailable: 'Today 2 PM'
  },
  {
    id: '6',
    name: 'Dr. Amanda Lee',
    title: 'Pelvic Floor Therapist',
    specialty: 'Postpartum Recovery',
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
    rating: 4.8,
    reviewCount: 176,
    tier: 'Gold',
    experience: '14 years',
    languages: ['English', 'Korean'],
    consultationFee: 190,
    available: false,
    nextAvailable: 'Monday'
  },
  {
    id: '7',
    name: 'Maria Garcia',
    title: 'Nutritionist',
    specialty: 'Postpartum Nutrition',
    image: 'https://randomuser.me/api/portraits/women/39.jpg',
    rating: 4.4,
    reviewCount: 87,
    tier: 'Bronze',
    experience: '6 years',
    languages: ['English', 'Spanish'],
    consultationFee: 85,
    available: true,
    nextAvailable: 'Tomorrow 9 AM'
  }
];