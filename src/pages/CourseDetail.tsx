import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockCourses } from '../data/mockData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Star, Users, Clock, PlayCircle, CheckCircle, CreditCard } from 'lucide-react'
import { formatCurrency } from '../lib/utils'
import { useAuthStore } from '../store/authStore'

export function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [showPayment, setShowPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'paypal' | 'stripe'>('credit_card')
  const [processing, setProcessing] = useState(false)

  const course = mockCourses.find(c => c.id === id)

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <Button onClick={() => navigate('/courses')}>Back to Courses</Button>
        </div>
      </div>
    )
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/signin')
      return
    }
    setShowPayment(true)
  }

  const handlePayment = async () => {
    setProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setProcessing(false)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div
        className="h-96 relative"
        style={{
          backgroundImage: `url(${course.thumbnail})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div className="max-w-2xl text-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded-full">
                {course.category}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
                {course.level}
              </span>
            </div>
            <h1 className="text-5xl font-bold mb-4">{course.title}</h1>
            <p className="text-xl mb-6">{course.description}</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{course.rating}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>{course.studentsEnrolled.toLocaleString()} students</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{course.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Your Instructor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <img
                    src={course.instructorAvatar}
                    alt={course.instructor}
                    className="h-20 w-20 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold">{course.instructor}</h3>
                    <p className="text-muted-foreground">Expert {course.category} Instructor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>{course.lessons.length} lessons • {course.duration} total length</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-accent transition-colors">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <PlayCircle className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">
                          {index + 1}. {lesson.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">{lesson.description}</p>
                        <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    'Master the fundamentals and advanced concepts',
                    'Build real-world projects from scratch',
                    'Best practices and industry standards',
                    'Get certificate upon completion',
                    'Lifetime access to course materials',
                    'Join our community of learners'
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardHeader>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {formatCurrency(course.price)}
                  </div>
                  <CardDescription>One-time payment • Lifetime access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!showPayment ? (
                    <>
                      <Button size="lg" className="w-full" onClick={handleEnroll}>
                        Enroll Now
                      </Button>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>30-day money-back guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Full lifetime access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span>Certificate of completion</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <CardTitle className="text-lg mb-4">Complete Your Payment</CardTitle>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Payment Method</label>
                          <div className="space-y-2">
                            {[
                              { value: 'credit_card', label: 'Credit Card', icon: CreditCard },
                              { value: 'paypal', label: 'PayPal', icon: CreditCard },
                              { value: 'stripe', label: 'Stripe', icon: CreditCard }
                            ].map(({ value, label, icon: Icon }) => (
                              <button
                                key={value}
                                onClick={() => setPaymentMethod(value as any)}
                                className={`w-full p-3 border rounded-lg flex items-center gap-3 transition-colors ${
                                  paymentMethod === value ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                                }`}
                              >
                                <Icon className="h-5 w-5" />
                                <span>{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Card Number</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-3 py-2 border rounded-md"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Expiry</label>
                            <input
                              type="text"
                              placeholder="MM/YY"
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-3 py-2 border rounded-md"
                            />
                          </div>
                        </div>

                        <div className="pt-4 border-t">
                          <div className="flex justify-between mb-4">
                            <span className="font-medium">Total:</span>
                            <span className="text-2xl font-bold text-primary">
                              {formatCurrency(course.price)}
                            </span>
                          </div>
                          <Button
                            size="lg"
                            className="w-full"
                            onClick={handlePayment}
                            disabled={processing}
                          >
                            {processing ? 'Processing...' : 'Complete Payment'}
                          </Button>
                          <Button
                            variant="ghost"
                            className="w-full mt-2"
                            onClick={() => setShowPayment(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
