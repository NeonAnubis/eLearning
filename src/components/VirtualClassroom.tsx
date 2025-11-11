import { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, Box, Plane, Sphere, Cylinder } from '@react-three/drei'
import * as THREE from 'three'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { ScrollArea } from './ui/scroll-area'
import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Video, Mic, MicOff, VideoOff, Users, MessageSquare, Hand, Monitor } from 'lucide-react'

// Stylish Modern Desk
function Desk({ position, color = '#6B4423' }: { position: [number, number, number], color?: string }) {
  return (
    <group position={position}>
      {/* Main desk surface with rounded edges */}
      <Box args={[1.4, 0.08, 0.9]} position={[0, 0.45, 0]} castShadow>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.1} />
      </Box>
      {/* Desk edge detail */}
      <Box args={[1.42, 0.02, 0.92]} position={[0, 0.49, 0]}>
        <meshStandardMaterial color="#4A2F1A" roughness={0.2} metalness={0.2} />
      </Box>
      {/* Modern metal legs */}
      <Box args={[0.06, 0.45, 0.06]} position={[-0.6, 0.225, -0.38]} castShadow>
        <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.7} />
      </Box>
      <Box args={[0.06, 0.45, 0.06]} position={[0.6, 0.225, -0.38]} castShadow>
        <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.7} />
      </Box>
      <Box args={[0.06, 0.45, 0.06]} position={[-0.6, 0.225, 0.38]} castShadow>
        <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.7} />
      </Box>
      <Box args={[0.06, 0.45, 0.06]} position={[0.6, 0.225, 0.38]} castShadow>
        <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.7} />
      </Box>
      {/* Connecting bars */}
      <Box args={[1.3, 0.04, 0.04]} position={[0, 0.1, -0.38]}>
        <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.7} />
      </Box>
      <Box args={[1.3, 0.04, 0.04]} position={[0, 0.1, 0.38]}>
        <meshStandardMaterial color="#2C2C2C" roughness={0.3} metalness={0.7} />
      </Box>
    </group>
  )
}

// Modern Chair (facing forward toward the whiteboard)
function Chair({ position, rotation = [0, 0, 0] }: { position: [number, number, number], rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Seat */}
      <Box args={[0.55, 0.08, 0.55]} position={[0, 0.35, 0]} castShadow>
        <meshStandardMaterial color="#1E40AF" roughness={0.4} metalness={0.1} />
      </Box>
      {/* Backrest - curved and stylish */}
      <Box args={[0.55, 0.5, 0.08]} position={[0, 0.65, -0.24]} castShadow>
        <meshStandardMaterial color="#1E3A8A" roughness={0.4} metalness={0.1} />
      </Box>
      {/* Backrest top support */}
      <Box args={[0.57, 0.06, 0.1]} position={[0, 0.88, -0.24]}>
        <meshStandardMaterial color="#1E3A8A" roughness={0.3} metalness={0.2} />
      </Box>
      {/* Metal frame legs */}
      {[-0.22, 0.22].map((x) =>
        [-0.22, 0.22].map((z) => (
          <Cylinder key={`${x}-${z}`} args={[0.025, 0.025, 0.35, 16]} position={[x, 0.175, z]} castShadow>
            <meshStandardMaterial color="#2C2C2C" roughness={0.2} metalness={0.8} />
          </Cylinder>
        ))
      )}
      {/* Armrests */}
      <Box args={[0.08, 0.3, 0.4]} position={[-0.3, 0.5, -0.05]}>
        <meshStandardMaterial color="#1E3A8A" roughness={0.4} metalness={0.1} />
      </Box>
      <Box args={[0.08, 0.3, 0.4]} position={[0.3, 0.5, -0.05]}>
        <meshStandardMaterial color="#1E3A8A" roughness={0.4} metalness={0.1} />
      </Box>
    </group>
  )
}

// Student 3D Model
function Student({ position, color, rotation = [0, 0, 0] }: { position: [number, number, number], color: string, rotation?: [number, number, number] }) {
  const headRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (headRef.current) {
      // Subtle head movement
      headRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <group position={position} rotation={rotation}>
      {/* Body */}
      <Box args={[0.35, 0.5, 0.25]} position={[0, 0.65, 0]} castShadow>
        <meshStandardMaterial color={color} />
      </Box>

      {/* Head */}
      <group ref={headRef} position={[0, 1.05, 0]}>
        <Sphere args={[0.18, 32, 32]} castShadow>
          <meshStandardMaterial color="#FFD4A3" roughness={0.8} />
        </Sphere>
        {/* Hair */}
        <Sphere args={[0.19, 32, 32]} position={[0, 0.05, 0]} castShadow>
          <meshStandardMaterial color="#2C1810" roughness={0.9} />
        </Sphere>
      </group>

      {/* Arms */}
      <Box args={[0.12, 0.4, 0.12]} position={[-0.25, 0.6, 0.1]} rotation={[0.3, 0, 0.2]} castShadow>
        <meshStandardMaterial color={color} />
      </Box>
      <Box args={[0.12, 0.4, 0.12]} position={[0.25, 0.6, 0.1]} rotation={[0.3, 0, -0.2]} castShadow>
        <meshStandardMaterial color={color} />
      </Box>

      {/* Hands on desk */}
      <Sphere args={[0.08, 16, 16]} position={[-0.25, 0.5, 0.3]} castShadow>
        <meshStandardMaterial color="#FFD4A3" />
      </Sphere>
      <Sphere args={[0.08, 16, 16]} position={[0.25, 0.5, 0.3]} castShadow>
        <meshStandardMaterial color="#FFD4A3" />
      </Sphere>

      {/* Legs (sitting) */}
      <Box args={[0.14, 0.35, 0.14]} position={[-0.12, 0.25, 0]} castShadow>
        <meshStandardMaterial color="#2C3E50" />
      </Box>
      <Box args={[0.14, 0.35, 0.14]} position={[0.12, 0.25, 0]} castShadow>
        <meshStandardMaterial color="#2C3E50" />
      </Box>

      {/* Book/Laptop on desk */}
      <Box args={[0.25, 0.02, 0.35]} position={[0, 0.53, 0.15]} castShadow>
        <meshStandardMaterial color="#34495E" metalness={0.3} />
      </Box>
    </group>
  )
}

// Teacher 3D Model
function Teacher({ position }: { position: [number, number, number] }) {
  const armRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (armRef.current) {
      // Animated arm gesturing
      armRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 1.5) * 0.3 - 0.3
    }
  })

  return (
    <group position={position}>
      {/* Body */}
      <Box args={[0.45, 0.7, 0.3]} position={[0, 1.15, 0]} castShadow>
        <meshStandardMaterial color="#1F2937" />
      </Box>

      {/* Head */}
      <Sphere args={[0.22, 32, 32]} position={[0, 1.75, 0]} castShadow>
        <meshStandardMaterial color="#FFD4A3" roughness={0.8} />
      </Sphere>

      {/* Hair */}
      <Sphere args={[0.23, 32, 32]} position={[0, 1.8, 0]} castShadow>
        <meshStandardMaterial color="#4A2F1A" roughness={0.9} />
      </Sphere>

      {/* Glasses */}
      <Box args={[0.35, 0.08, 0.02]} position={[0, 1.75, 0.2]}>
        <meshStandardMaterial color="#2C2C2C" metalness={0.8} roughness={0.2} />
      </Box>

      {/* Left arm (static) */}
      <Box args={[0.14, 0.5, 0.14]} position={[-0.32, 0.95, 0]} rotation={[0, 0, -0.3]} castShadow>
        <meshStandardMaterial color="#1F2937" />
      </Box>

      {/* Right arm (gesturing - animated) */}
      <group ref={armRef} position={[0.32, 1.2, 0]}>
        <Box args={[0.14, 0.5, 0.14]} position={[0, -0.25, 0]} castShadow>
          <meshStandardMaterial color="#1F2937" />
        </Box>
        {/* Hand */}
        <Sphere args={[0.1, 16, 16]} position={[0, -0.5, 0]} castShadow>
          <meshStandardMaterial color="#FFD4A3" />
        </Sphere>
      </group>

      {/* Legs */}
      <Box args={[0.16, 0.6, 0.16]} position={[-0.15, 0.5, 0]} castShadow>
        <meshStandardMaterial color="#2C3E50" />
      </Box>
      <Box args={[0.16, 0.6, 0.16]} position={[0.15, 0.5, 0]} castShadow>
        <meshStandardMaterial color="#2C3E50" />
      </Box>

      {/* Shoes */}
      <Box args={[0.18, 0.08, 0.28]} position={[-0.15, 0.04, 0.05]} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
      <Box args={[0.18, 0.08, 0.28]} position={[0.15, 0.04, 0.05]} castShadow>
        <meshStandardMaterial color="#1a1a1a" />
      </Box>

      {/* Pointer/Marker in hand */}
      <Cylinder args={[0.02, 0.02, 0.4, 8]} position={[0.4, 1.2, 0.3]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <meshStandardMaterial color="#DC2626" />
      </Cylinder>
    </group>
  )
}

// Enhanced Whiteboard
function Whiteboard() {
  return (
    <group position={[0, 2, -4.85]}>
      {/* Board */}
      <Box args={[4.5, 2.2, 0.08]} castShadow receiveShadow>
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
      </Box>

      {/* Frame - Modern aluminum */}
      <Box args={[4.6, 0.12, 0.1]} position={[0, 1.16, 0]}>
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} />
      </Box>
      <Box args={[4.6, 0.12, 0.1]} position={[0, -1.16, 0]}>
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} />
      </Box>
      <Box args={[0.12, 2.4, 0.1]} position={[-2.34, 0, 0]}>
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} />
      </Box>
      <Box args={[0.12, 2.4, 0.1]} position={[2.34, 0, 0]}>
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} />
      </Box>

      {/* Marker tray */}
      <Box args={[4.4, 0.08, 0.15]} position={[0, -1.2, 0.08]}>
        <meshStandardMaterial color="#888888" roughness={0.3} metalness={0.7} />
      </Box>

      {/* Text on Whiteboard */}
      <Text
        position={[0, 0.7, 0.05]}
        fontSize={0.35}
        color="#2563EB"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to EduVerse
      </Text>
      <Text
        position={[0, 0.2, 0.05]}
        fontSize={0.18}
        color="#1F2937"
        anchorX="center"
        anchorY="middle"
      >
        Virtual Classroom Experience
      </Text>
      <Text
        position={[0, -0.2, 0.05]}
        fontSize={0.14}
        color="#6B7280"
        anchorX="center"
        anchorY="middle"
      >
        Today's Topic: Advanced Web Development
      </Text>

      {/* Some diagrams/drawings on board */}
      <Box args={[1.5, 0.02, 0.02]} position={[-1.2, -0.6, 0.05]}>
        <meshStandardMaterial color="#DC2626" />
      </Box>
      <Box args={[0.02, 0.8, 0.02]} position={[-1.95, -0.7, 0.05]}>
        <meshStandardMaterial color="#DC2626" />
      </Box>
      <Box args={[0.02, 0.8, 0.02]} position={[-0.45, -0.7, 0.05]}>
        <meshStandardMaterial color="#DC2626" />
      </Box>
    </group>
  )
}

function ClassroomScene() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.05
    }
  })

  // Student shirt colors for variety
  const studentColors = ['#DC2626', '#2563EB', '#059669', '#7C3AED', '#EA580C', '#0891B2', '#4F46E5', '#BE123C', '#0D9488', '#7C2D12', '#1E40AF', '#047857']

  return (
    <group ref={groupRef}>
      {/* Floor with texture */}
      <Plane args={[14, 12]} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <meshStandardMaterial color="#C19A6B" roughness={0.8} />
      </Plane>

      {/* Walls with better lighting */}
      <Plane args={[14, 6]} position={[0, 3, -5.5]} receiveShadow>
        <meshStandardMaterial color="#F5F5F5" roughness={0.9} />
      </Plane>
      <Plane args={[12, 6]} rotation={[0, Math.PI / 2, 0]} position={[-7, 3, 0]} receiveShadow>
        <meshStandardMaterial color="#FAFAFA" roughness={0.9} />
      </Plane>
      <Plane args={[12, 6]} rotation={[0, -Math.PI / 2, 0]} position={[7, 3, 0]} receiveShadow>
        <meshStandardMaterial color="#FAFAFA" roughness={0.9} />
      </Plane>

      {/* Ceiling */}
      <Plane args={[14, 12]} rotation={[Math.PI / 2, 0, 0]} position={[0, 6, 0]}>
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} />
      </Plane>

      {/* Ceiling lights */}
      <Box args={[2, 0.1, 0.5]} position={[-2, 5.9, 0]}>
        <meshStandardMaterial color="#EEEEEE" emissive="#FFFFFF" emissiveIntensity={0.3} />
      </Box>
      <Box args={[2, 0.1, 0.5]} position={[2, 5.9, 0]}>
        <meshStandardMaterial color="#EEEEEE" emissive="#FFFFFF" emissiveIntensity={0.3} />
      </Box>

      {/* Whiteboard at front */}
      <Whiteboard />

      {/* Teacher at the front */}
      <Teacher position={[1.2, 0, -4]} />

      {/* Student Desks and Students - 3 rows, 4 desks each */}
      {[-3, -1, 1, 3].map((x, i) =>
        [1.5, 3, 4.5].map((z, j) => {
          const studentIndex = i * 3 + j
          return (
            <group key={`${i}-${j}`}>
              <Desk position={[x, 0, z]} />
              <Chair position={[x, 0, z + 0.5]} rotation={[0, Math.PI, 0]} />
              <Student position={[x, 0.35, z + 0.3]} color={studentColors[studentIndex % studentColors.length]} rotation={[0, Math.PI, 0]} />
            </group>
          )
        })
      )}

      {/* Teacher's Desk */}
      <Desk position={[-1.5, 0, -3.5]} color="#4A2F1A" />

      {/* Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <pointLight position={[-4, 4, 2]} intensity={0.4} color="#FFF4E6" />
      <pointLight position={[4, 4, 2]} intensity={0.4} color="#FFF4E6" />
      <spotLight position={[0, 5, -4]} angle={0.5} intensity={0.8} castShadow target-position={[0, 0, -4]} />
    </group>
  )
}

export function VirtualClassroom() {
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [handRaised, setHandRaised] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">3D Virtual Classroom</h1>
          <p className="text-muted-foreground">
            Experience immersive learning in our interactive 3D environment
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* 3D Canvas */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-gray-900 relative">
                <Canvas shadows style={{ width: '100%', height: '100%' }}>
                  <PerspectiveCamera makeDefault position={[0, 4, 10]} />
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2.1}
                    minDistance={6}
                    maxDistance={18}
                    target={[0, 1.5, 0]}
                  />
                  <ClassroomScene />
                  <color attach="background" args={['#1a1a1a']} />
                </Canvas>

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/90 backdrop-blur-sm px-6 py-3 rounded-full border">
                  <Button
                    size="icon"
                    variant={isMuted ? "destructive" : "default"}
                    onClick={() => setIsMuted(!isMuted)}
                    className="rounded-full"
                  >
                    {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant={isVideoOff ? "destructive" : "default"}
                    onClick={() => setIsVideoOff(!isVideoOff)}
                    className="rounded-full"
                  >
                    {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                  </Button>
                  <Button
                    size="icon"
                    variant={handRaised ? "default" : "outline"}
                    onClick={() => setHandRaised(!handRaised)}
                    className="rounded-full"
                  >
                    <Hand className="h-5 w-5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full"
                  >
                    <Monitor className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Instructions */}
            <Card className="mt-4 p-4">
              <h3 className="font-semibold mb-2">Navigation Controls</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Click and drag to rotate the view</li>
                <li>• Scroll to zoom in/out</li>
                <li>• Right-click and drag to pan</li>
                <li>• Use the bottom controls for mic, camera, and interactions</li>
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Participants */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Participants (13)
                </h3>
              </div>
              <ScrollArea className="h-40">
                <div className="space-y-2">
                  {['Dr. Sarah Johnson (Instructor)', 'John Doe', 'Alice Smith', 'Bob Wilson', 'Emma Davis', 'Michael Chen', 'Lisa Garcia', 'David Kim', 'Sarah Lopez', 'Tom Anderson', 'Maria Rodriguez', 'James Taylor', 'Emily White'].map((name, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm flex-1">{name}</span>
                      {i === 0 && <Badge variant="secondary">Host</Badge>}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Chat */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </h3>
              </div>
              <ScrollArea className="h-60 mb-3">
                <div className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium text-xs text-muted-foreground mb-1">Dr. Sarah Johnson</p>
                    <p className="bg-accent p-2 rounded">Welcome everyone to today's session on Advanced Web Development!</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-xs text-muted-foreground mb-1">John Doe</p>
                    <p className="bg-accent p-2 rounded">Thank you! Excited to learn about Three.js.</p>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium text-xs text-muted-foreground mb-1">Alice Smith</p>
                    <p className="bg-accent p-2 rounded">This 3D classroom is amazing!</p>
                  </div>
                </div>
              </ScrollArea>
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button size="sm">Send</Button>
              </div>
            </Card>

            {/* Session Info */}
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Session Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-green-600">Live</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">1h 15min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course:</span>
                  <span className="font-medium">Web Dev Bootcamp</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
