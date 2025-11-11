import { Button } from "../ui/button";
import { Play, BookOpen, Users, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { useRef, useState, useEffect } from "react";

export function Hero() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(1); // 1 or 2

  const videos = [
    "/videos/1.mp4",
    "/videos/2.mp4",
    "/videos/3.mp4",
    "/videos/4.mp4",
    "/videos/5.mp4",
  ];

  useEffect(() => {
    const video1 = videoRef1.current;
    const video2 = videoRef2.current;
    if (!video1 || !video2) return;

    const handleVideoEnd = () => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      const nextVideo = activeVideo === 1 ? video2 : video1;

      // Preload next video
      nextVideo.src = videos[nextIndex];
      nextVideo.load();

      // Start playing next video
      nextVideo.play().catch((error) => {
        console.error("Error playing video:", error);
      });

      // Switch active video after a brief delay to allow crossfade
      setTimeout(() => {
        setCurrentVideoIndex(nextIndex);
        setActiveVideo(activeVideo === 1 ? 2 : 1);
      }, 300);
    };

    const currentVideo = activeVideo === 1 ? video1 : video2;
    currentVideo.addEventListener("ended", handleVideoEnd);

    return () => {
      currentVideo.removeEventListener("ended", handleVideoEnd);
    };
  }, [currentVideoIndex, activeVideo, videos]);

  useEffect(() => {
    // Initialize first video
    const video1 = videoRef1.current;
    if (!video1) return;

    video1.src = videos[0];
    video1.load();
    video1.play().catch((error) => {
      console.error("Error playing initial video:", error);
    });

    // Preload second video
    const video2 = videoRef2.current;
    if (video2) {
      video2.src = videos[1];
      video2.load();
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Videos with Crossfade */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef1}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 1 ? "opacity-100" : "opacity-0"
          }`}
        />
        <video
          ref={videoRef2}
          muted
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            activeVideo === 2 ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50 z-10" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Your Future with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Online Learning
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Access world-class education from anywhere. Learn at your own pace
            with expert instructors and earn verified certificates.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate(isAuthenticated ? "/courses" : "/signup")}
            >
              <Play className="mr-2 h-5 w-5" />
              {isAuthenticated ? "Browse Courses" : "Get Started Free"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              onClick={() => navigate("/virtual-classroom")}
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
  );
}
