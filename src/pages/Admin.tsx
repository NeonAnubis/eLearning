import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Users, BookOpen, Video, Award, DollarSign, TrendingUp } from 'lucide-react'
import { mockCourses, mockUsers } from '../data/mockData'

export function Admin() {
  const totalRevenue = mockCourses.reduce((sum, course) => sum + (course.price * course.studentsEnrolled), 0)
  const totalInstructors = mockUsers.filter(u => u.role === 'instructor').length

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-xl text-muted-foreground">Manage your e-learning platform</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50,234</div>
              <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                <TrendingUp className="h-3 w-3" />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockCourses.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {totalInstructors} instructors
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Certificates Issued</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25,432</div>
              <p className="text-xs text-muted-foreground mt-1">
                This year
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
              <CardDescription>Based on enrollment numbers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses
                  .sort((a, b) => b.studentsEnrolled - a.studentsEnrolled)
                  .slice(0, 5)
                  .map((course, index) => (
                    <div key={course.id} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{course.title}</p>
                        <p className="text-sm text-muted-foreground">{course.studentsEnrolled.toLocaleString()} students</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">${(course.price * course.studentsEnrolled).toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest platform updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New student registered</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Course completed by John Doe</p>
                    <p className="text-xs text-muted-foreground">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Award className="h-4 w-4 text-purple-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Certificate issued</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Video className="h-4 w-4 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Webinar scheduled</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Management */}
        <Card>
          <CardHeader>
            <CardTitle>Course Management</CardTitle>
            <CardDescription>Manage all courses on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Course</th>
                    <th className="text-left py-3 px-4">Instructor</th>
                    <th className="text-left py-3 px-4">Students</th>
                    <th className="text-left py-3 px-4">Price</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.slice(0, 5).map(course => (
                    <tr key={course.id} className="border-b hover:bg-accent">
                      <td className="py-3 px-4">
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.category}</div>
                      </td>
                      <td className="py-3 px-4">{course.instructor}</td>
                      <td className="py-3 px-4">{course.studentsEnrolled.toLocaleString()}</td>
                      <td className="py-3 px-4">${course.price}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-500/10 text-green-600 text-xs rounded-full">
                          Active
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
