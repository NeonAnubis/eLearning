# EduVerse - Quick Start Guide

## 🚀 Getting Started

### Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 🔑 Demo Credentials

**Student Account:**
- Email: `john.doe@example.com`
- Password: `password123`

**Or create a new account using the Sign Up page**

## 📋 Features to Explore

### 1. Home Page (/)
- Hero section with auto-playing video
- Featured courses carousel
- Platform features overview

### 2. Browse Courses (/courses)
- Search and filter courses
- View detailed course information
- Enroll in courses with mockup payment

### 3. Course Details (/courses/:id)
- Complete course information
- Instructor details
- Payment gateway integration
- Course content preview

### 4. 3D Virtual Classroom (/virtual-classroom)
- Interactive 3D environment
- Navigate using mouse:
  - **Left-click + drag**: Rotate view
  - **Scroll**: Zoom in/out
  - **Right-click + drag**: Pan camera
- Virtual participants and chat
- Audio/video controls

### 5. Live Webinars (/webinars)
- View live and upcoming sessions
- Register for webinars
- Filter by category

### 6. Student Dashboard (/dashboard)
- Track learning progress
- View enrolled courses
- Access earned certificates
- Course recommendations

### 7. Admin Dashboard (/admin)
- Platform analytics
- Revenue tracking
- Student and course management
- Activity monitoring

## 🎨 Dark/Light Mode

Click the moon/sun icon in the header to toggle between dark and light themes.

## 📱 Responsive Design

The platform is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🎯 Technology Highlights

- **React 18** with TypeScript
- **Three.js** for 3D graphics
- **TailwindCSS** for styling
- **Zustand** for state management
- **QR Code** generation for certificates

## 📝 Notes

- All data is mockup data stored in `src/data/mockData.ts`
- Payment integration is simulated (no real transactions)
- Certificates are generated with QR codes for verification
- The 3D classroom uses WebGL (requires modern browser)

## 🐛 Troubleshooting

If you encounter any issues:

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear browser cache and refresh

3. Ensure you're using Node.js 16+ and a modern browser

## 🎓 Happy Learning!

Explore all features and enjoy the comprehensive e-learning experience!
