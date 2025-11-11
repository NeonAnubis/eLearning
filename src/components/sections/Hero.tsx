import { Button } from '../ui/button'
import { Play, BookOpen, Users, Award } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'

export function Hero() {
  const navigate = useNavigate()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="https://cdn.coverr.co/videos/coverr-students-in-a-library-studying-4764/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Future with{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Online Learning
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Access world-class education from anywhere. Learn at your own pace with expert instructors and earn verified certificates.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate(isAuthenticated ? '/courses' : '/signup')}
            >
              <Play className="mr-2 h-5 w-5" />
              {isAuthenticated ? 'Browse Courses' : 'Get Started Free'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate('/virtual-classroom')}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              Virtual Classroom
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-3xl font-bold mb-1">50K+</div>
              <div className="text-sm text-gray-300">Active Students</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="h-8 w-8 text-purple-400" />
              </div>
              <div className="text-3xl font-bold mb-1">300+</div>
              <div className="text-sm text-gray-300">Expert Courses</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Award className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold mb-1">25K+</div>
              <div className="text-sm text-gray-300">Certificates Issued</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
