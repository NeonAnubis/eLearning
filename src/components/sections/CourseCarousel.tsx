import { useEffect, useState } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'
import { Star, Users, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { mockCourses } from '../../data/mockData'
import { formatCurrency } from '../../lib/utils'
import { useNavigate } from 'react-router-dom'

export function CourseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const navigate = useNavigate()
  const featuredCourses = mockCourses.filter(c => c.featured)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCourses.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [featuredCourses.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCourses.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most popular courses, handpicked by industry experts
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredCourses.map((course) => (
                <div key={course.id} className="w-full flex-shrink-0 px-4">
                  <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div
                        className="h-64 md:h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${course.thumbnail})` }}
                      />
                      <div className="p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                              {course.category}
                            </span>
                            <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-semibold rounded-full">
                              {course.level}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold mb-3">{course.title}</h3>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {course.description}
                          </p>

                          <div className="flex items-center gap-4 mb-4">
                            <img
                              src={course.instructorAvatar}
                              alt={course.instructor}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-medium">{course.instructor}</p>
                              <p className="text-xs text-muted-foreground">Instructor</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              <span className="text-sm font-medium">{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              <span className="text-sm">{course.studentsEnrolled.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{course.duration}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div>
                            <span className="text-3xl font-bold text-primary">
                              {formatCurrency(course.price)}
                            </span>
                          </div>
                          <Button onClick={() => navigate(`/courses/${course.id}`)}>
                            Enroll Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background border rounded-full p-3 shadow-lg hover:bg-accent transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background border rounded-full p-3 shadow-lg hover:bg-accent transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {featuredCourses.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
