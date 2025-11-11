import { Moon, Sun, Menu, LogOut, BookOpen } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/signin')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              EduVerse
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </a>
            <a href="/courses" className="text-sm font-medium hover:text-primary transition-colors">
              Courses
            </a>
            <a href="/webinars" className="text-sm font-medium hover:text-primary transition-colors">
              Webinars
            </a>
            {isAuthenticated && (
              <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
                Dashboard
              </a>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'}
                  alt={user?.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" onClick={() => navigate('/signin')}>
                Sign In
              </Button>
              <Button onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors py-2">
              Home
            </a>
            <a href="/courses" className="text-sm font-medium hover:text-primary transition-colors py-2">
              Courses
            </a>
            <a href="/webinars" className="text-sm font-medium hover:text-primary transition-colors py-2">
              Webinars
            </a>
            {isAuthenticated && (
              <a href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors py-2">
                Dashboard
              </a>
            )}
            {!isAuthenticated && (
              <div className="flex flex-col gap-2 pt-2">
                <Button variant="ghost" onClick={() => navigate('/signin')} className="justify-start">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </div>
            )}
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="justify-start"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
