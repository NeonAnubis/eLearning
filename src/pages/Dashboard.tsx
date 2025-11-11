import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { BookOpen, Award, Video, TrendingUp, PlayCircle } from 'lucide-react'
import { mockCourses, mockCertificates } from '../data/mockData'
import { useAuthStore } from '../store/authStore'
import { Certificate } from '../components/Certificate'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Dashboard() {
  const { user } = useAuthStore()
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)
  const navigate = useNavigate()

  const enrolledCourses = mockCourses.filter(c => user?.enrolledCourses?.includes(c.id))
  const userCertificates = mockCertificates.filter(c => c.userId === user?.id)

  const certificate = selectedCertificate
    ? userCertificates.find(c => c.id === selectedCertificate)
    : null

  if (certificate) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <Button variant="outline" onClick={() => setSelectedCertificate(null)} className="mb-6">
            Back to Dashboard
          </Button>
          <Certificate certificate={certificate} />
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-background/95 backdrop-blur-sm min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-xl text-muted-foreground">Continue your learning journey</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{enrolledCourses.length}</div>
                <p className="text-xs text-muted-foreground">Active learning</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Certificates</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userCertificates.length}</div>
                <p className="text-xs text-muted-foreground">Earned credentials</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Webinars</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">Attended</p>
              </CardContent>
            </Card>
          </div>

          {/* Continue Learning */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => {
                const progress = Math.floor(Math.random() * 100)
                return (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <div
                      className="h-40 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${course.thumbnail})` }}
                    >
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="secondary" onClick={() => navigate(`/courses/${course.id}`)}>
                          <PlayCircle className="h-5 w-5 mr-2" />
                          Continue
                        </Button>
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription>{course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-semibold">{progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary rounded-full h-2 transition-all"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Certificates */}
          {userCertificates.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Certificates</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userCertificates.map(cert => (
                  <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-center mb-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 text-center">{cert.courseName}</CardTitle>
                      <CardDescription className="text-center">
                        Completed on {new Date(cert.completionDate).toLocaleDateString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full"
                        onClick={() => setSelectedCertificate(cert.id)}
                      >
                        View Certificate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCourses.filter(c => !enrolledCourses.find(ec => ec.id === c.id)).slice(0, 3).map(course => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                  />
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" onClick={() => navigate(`/courses/${course.id}`)}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
