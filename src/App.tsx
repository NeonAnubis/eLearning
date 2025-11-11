import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Courses } from './pages/Courses'
import { CourseDetail } from './pages/CourseDetail'
import { Webinars } from './pages/Webinars'
import { Dashboard } from './pages/Dashboard'
import { Admin } from './pages/Admin'
import { VirtualClassroom } from './components/VirtualClassroom'
import { useAuthStore } from './store/authStore'
import { useThemeStore } from './store/themeStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />
  }

  return <>{children}</>
}

function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    // Initialize theme on mount
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/virtual-classroom" element={<VirtualClassroom />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  )
}

export default App
