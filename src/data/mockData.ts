import type { Course, User, Webinar, Certificate } from '../types'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    enrolledCourses: ['1', '2', '3'],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    email: 'sarah.johnson@example.com',
    name: 'Dr. Sarah Johnson',
    role: 'instructor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    createdAt: new Date('2023-06-10')
  },
  {
    id: '3',
    email: 'admin@elearning.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    createdAt: new Date('2023-01-01')
  }
]

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    description: 'Master modern web development with HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and launch your career as a full-stack developer.',
    instructor: 'Dr. Sarah Johnson',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
    price: 89.99,
    duration: '52 hours',
    level: 'Beginner',
    category: 'Web Development',
    rating: 4.8,
    studentsEnrolled: 12453,
    featured: true,
    createdAt: new Date('2024-01-01'),
    lessons: [
      {
        id: 'l1',
        title: 'Introduction to Web Development',
        description: 'Learn the fundamentals of web development and set up your development environment',
        duration: '45 min',
        videoUrl: 'https://www.youtube.com/watch?v=sample1',
        order: 1
      },
      {
        id: 'l2',
        title: 'HTML5 Fundamentals',
        description: 'Deep dive into HTML5 structure, semantic elements, and best practices',
        duration: '1.5 hours',
        videoUrl: 'https://www.youtube.com/watch?v=sample2',
        order: 2
      },
      {
        id: 'l3',
        title: 'CSS3 and Modern Styling',
        description: 'Master CSS3, Flexbox, Grid, and responsive design techniques',
        duration: '2 hours',
        videoUrl: 'https://www.youtube.com/watch?v=sample3',
        order: 3
      }
    ]
  },
  {
    id: '2',
    title: 'Machine Learning and AI Fundamentals',
    description: 'Dive into the world of artificial intelligence and machine learning. Learn Python, TensorFlow, neural networks, and build intelligent applications.',
    instructor: 'Prof. Michael Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    price: 129.99,
    duration: '68 hours',
    level: 'Intermediate',
    category: 'Data Science',
    rating: 4.9,
    studentsEnrolled: 8792,
    featured: true,
    createdAt: new Date('2024-02-15'),
    lessons: [
      {
        id: 'l4',
        title: 'Introduction to Machine Learning',
        description: 'Understanding ML concepts, types of learning, and real-world applications',
        duration: '1 hour',
        order: 1
      },
      {
        id: 'l5',
        title: 'Python for Data Science',
        description: 'Master Python libraries: NumPy, Pandas, Matplotlib for data analysis',
        duration: '2.5 hours',
        order: 2
      }
    ]
  },
  {
    id: '3',
    title: 'Digital Marketing Masterclass',
    description: 'Learn SEO, social media marketing, content strategy, email marketing, and analytics. Grow your business or start a marketing career.',
    instructor: 'Emily Rodriguez',
    instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    price: 79.99,
    duration: '42 hours',
    level: 'Beginner',
    category: 'Marketing',
    rating: 4.7,
    studentsEnrolled: 15621,
    featured: true,
    createdAt: new Date('2024-03-01'),
    lessons: [
      {
        id: 'l6',
        title: 'Digital Marketing Overview',
        description: 'Introduction to digital marketing channels and strategies',
        duration: '50 min',
        order: 1
      }
    ]
  },
  {
    id: '4',
    title: 'UI/UX Design Pro: From Beginner to Expert',
    description: 'Master user interface and user experience design. Learn Figma, design thinking, prototyping, and create stunning designs.',
    instructor: 'Alex Thompson',
    instructorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
    price: 99.99,
    duration: '38 hours',
    level: 'Intermediate',
    category: 'Design',
    rating: 4.8,
    studentsEnrolled: 9234,
    createdAt: new Date('2024-02-20'),
    lessons: [
      {
        id: 'l7',
        title: 'Design Thinking Principles',
        description: 'Understanding user-centered design and design thinking methodology',
        duration: '1.2 hours',
        order: 1
      }
    ]
  },
  {
    id: '5',
    title: 'Cloud Computing with AWS',
    description: 'Learn Amazon Web Services from scratch. Master EC2, S3, Lambda, and become AWS certified.',
    instructor: 'David Kumar',
    instructorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    price: 119.99,
    duration: '55 hours',
    level: 'Advanced',
    category: 'Cloud Computing',
    rating: 4.9,
    studentsEnrolled: 6845,
    createdAt: new Date('2024-01-20'),
    lessons: [
      {
        id: 'l8',
        title: 'Introduction to AWS',
        description: 'Getting started with Amazon Web Services and cloud concepts',
        duration: '1 hour',
        order: 1
      }
    ]
  },
  {
    id: '6',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android using React Native and JavaScript.',
    instructor: 'Lisa Martinez',
    instructorAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
    price: 94.99,
    duration: '48 hours',
    level: 'Intermediate',
    category: 'Mobile Development',
    rating: 4.7,
    studentsEnrolled: 7432,
    createdAt: new Date('2024-03-10'),
    lessons: [
      {
        id: 'l9',
        title: 'React Native Basics',
        description: 'Setting up React Native and understanding core components',
        duration: '1.5 hours',
        order: 1
      }
    ]
  }
]

export const mockWebinars: Webinar[] = [
  {
    id: 'w1',
    title: 'The Future of AI in Education',
    description: 'Join us for an insightful discussion on how artificial intelligence is transforming the educational landscape and what it means for learners and educators.',
    instructor: 'Prof. Michael Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    scheduledDate: new Date('2025-11-15T14:00:00'),
    duration: '90 minutes',
    maxParticipants: 500,
    currentParticipants: 347,
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    isLive: false,
    category: 'Technology',
    price: 0
  },
  {
    id: 'w2',
    title: 'Live Coding: Building a Full-Stack App',
    description: 'Watch and learn as we build a complete full-stack application from scratch using React, Node.js, and MongoDB in real-time.',
    instructor: 'Dr. Sarah Johnson',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    scheduledDate: new Date('2025-11-12T18:00:00'),
    duration: '2 hours',
    maxParticipants: 300,
    currentParticipants: 289,
    thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    isLive: true,
    category: 'Web Development',
    price: 29.99
  },
  {
    id: 'w3',
    title: 'Career Path in UI/UX Design',
    description: 'Discover the roadmap to becoming a successful UI/UX designer, including portfolio tips, job search strategies, and industry insights.',
    instructor: 'Alex Thompson',
    instructorAvatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    scheduledDate: new Date('2025-11-20T16:00:00'),
    duration: '60 minutes',
    maxParticipants: 200,
    currentParticipants: 142,
    thumbnail: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop',
    isLive: false,
    category: 'Design',
    price: 0
  }
]

export const mockCertificates: Certificate[] = [
  {
    id: 'cert1',
    userId: '1',
    courseId: '1',
    courseName: 'Complete Web Development Bootcamp 2024',
    studentName: 'John Doe',
    completionDate: new Date('2024-10-15'),
    qrCode: 'QR_CODE_DATA_HERE',
    certificateNumber: 'WD-2024-001234'
  }
]
