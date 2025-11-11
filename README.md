# EduVerse - Comprehensive E-Learning Platform

A modern, full-featured e-learning platform built with React, TypeScript, TailwindCSS, Three.js, and Shadcn/ui.

## Features

### 🎓 Core Functionality
- **User Authentication**: Sign-in and sign-up with mockup data
- **Course Catalog**: Browse and search through hundreds of courses
- **3D Virtual Classroom**: Immersive learning experience powered by Three.js
- **Live Webinars**: Real-time interactive sessions with instructors
- **Payment Gateway**: Secure mockup payment integration (Credit Card, PayPal, Stripe)
- **Digital Certificates**: QR code verified certificates upon course completion
- **Student Dashboard**: Track progress, view enrolled courses, and certificates
- **Admin Dashboard**: Manage courses, students, and platform analytics

### 🎨 Design Features
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Design**: Works perfectly on all devices
- **Modern UI**: Built with Shadcn/ui components
- **Beautiful Backgrounds**: Meaningful images from Unsplash
- **Auto-playing Hero Video**: Engaging landing page experience
- **Smooth Carousel**: Featured courses showcase

## Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast development
- **TailwindCSS** for styling
- **Shadcn/ui** for UI components
- **Three.js** with React Three Fiber for 3D graphics
- **Zustand** for state management
- **React Router** for navigation
- **QRCode** for certificate verification
- **Lucide React** for icons

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Install dependencies (if not already done):
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

## Demo Credentials

To test the platform, use these demo credentials:

**Student Account:**
- Email: `john.doe@example.com`
- Password: `password123`

**Any account can be created via Sign Up**

## Key Routes

- `/` - Home page with hero and carousel
- `/signin` - Sign in page
- `/signup` - Sign up page
- `/courses` - Browse all courses
- `/courses/:id` - Course details and enrollment
- `/webinars` - Live and upcoming webinars
- `/virtual-classroom` - 3D virtual classroom
- `/dashboard` - Student dashboard (protected)
- `/admin` - Admin dashboard (protected)

## Features Walkthrough

### 1. Hero Section
- Auto-playing background video
- Call-to-action buttons
- Platform statistics

### 2. Course Carousel
- Auto-rotating featured courses
- Manual navigation controls
- Detailed course information

### 3. 3D Virtual Classroom
- Interactive 3D environment using Three.js
- Camera controls (rotate, zoom, pan)
- Virtual desks, whiteboard, and classroom layout
- Participant list and chat
- Video/audio controls mockup

### 4. Payment System
- Multiple payment methods
- Card information form
- Order summary
- Secure payment mockup

### 5. Digital Certificates
- Professional certificate design
- QR code for verification
- Printable format
- Unique certificate numbers

## Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## License

MIT
