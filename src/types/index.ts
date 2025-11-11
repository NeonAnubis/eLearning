export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'instructor' | 'admin'
  avatar?: string
  enrolledCourses?: string[]
  createdAt: Date
}

export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar: string
  thumbnail: string
  price: number
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  rating: number
  studentsEnrolled: number
  lessons: Lesson[]
  createdAt: Date
  featured?: boolean
}

export interface Lesson {
  id: string
  title: string
  description: string
  duration: string
  videoUrl?: string
  completed?: boolean
  order: number
}

export interface Certificate {
  id: string
  userId: string
  courseId: string
  courseName: string
  studentName: string
  completionDate: Date
  qrCode: string
  certificateNumber: string
}

export interface Webinar {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar: string
  scheduledDate: Date
  duration: string
  maxParticipants: number
  currentParticipants: number
  thumbnail: string
  isLive: boolean
  category: string
  price: number
}

export interface Payment {
  id: string
  userId: string
  amount: number
  courseId?: string
  webinarId?: string
  status: 'pending' | 'completed' | 'failed'
  paymentMethod: 'credit_card' | 'paypal' | 'stripe'
  createdAt: Date
}

export interface Enrollment {
  id: string
  userId: string
  courseId: string
  enrolledAt: Date
  progress: number
  completed: boolean
  certificateIssued: boolean
}
