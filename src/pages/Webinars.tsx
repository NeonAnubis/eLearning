import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Video, Calendar, Users, Clock } from 'lucide-react'
import { mockWebinars } from '../data/mockData'
import { formatCurrency, formatDate } from '../lib/utils'
import { useNavigate } from 'react-router-dom'

export function Webinars() {
  const navigate = useNavigate()

  const liveWebinars = mockWebinars.filter(w => w.isLive)
  const upcomingWebinars = mockWebinars.filter(w => !w.isLive)

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-background/95 backdrop-blur-sm min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">Live Webinars & Sessions</h1>
            <p className="text-xl text-muted-foreground">
              Join interactive sessions with expert instructors in real-time
            </p>
          </div>

          {/* Live Now */}
          {liveWebinars.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse" />
                <h2 className="text-2xl font-bold">Live Now</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {liveWebinars.map(webinar => (
                  <Card key={webinar.id} className="border-red-500 border-2">
                    <div
                      className="h-48 bg-cover bg-center relative"
                      style={{ backgroundImage: `url(${webinar.thumbnail})` }}
                    >
                      <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
                        LIVE
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle>{webinar.title}</CardTitle>
                      <CardDescription>{webinar.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={webinar.instructorAvatar}
                            alt={webinar.instructor}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{webinar.instructor}</p>
                            <p className="text-sm text-muted-foreground">Instructor</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{webinar.currentParticipants}/{webinar.maxParticipants}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">
                        {webinar.price === 0 ? 'Free' : formatCurrency(webinar.price)}
                      </span>
                      <Button onClick={() => navigate('/virtual-classroom')}>
                        <Video className="h-4 w-4 mr-2" />
                        Join Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Upcoming */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Upcoming Sessions</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingWebinars.map(webinar => (
                <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{ backgroundImage: `url(${webinar.thumbnail})` }}
                  />
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                        {webinar.category}
                      </span>
                    </div>
                    <CardTitle className="line-clamp-2">{webinar.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{webinar.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={webinar.instructorAvatar}
                          alt={webinar.instructor}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">{webinar.instructor}</span>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(webinar.scheduledDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{webinar.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{webinar.currentParticipants}/{webinar.maxParticipants} registered</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">
                      {webinar.price === 0 ? 'Free' : formatCurrency(webinar.price)}
                    </span>
                    <Button>
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
