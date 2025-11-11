import { Hero } from '../components/sections/Hero'
import { CourseCarousel } from '../components/sections/CourseCarousel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Award, Video, Shield, TrendingUp } from 'lucide-react'

export function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <CourseCarousel />

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose EduVerse?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide everything you need for a world-class learning experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle>Verified Certificates</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Earn industry-recognized certificates with QR code verification upon course completion
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Video className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <CardTitle>Live Webinars</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join interactive live sessions with expert instructors and ask questions in real-time
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Shield className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Safe and secure payment gateway with multiple payment options for your convenience
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-orange-500" />
                  </div>
                </div>
                <CardTitle>Track Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Monitor your learning journey with detailed analytics and personalized dashboards
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
