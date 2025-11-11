import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Video, Mic, MicOff, VideoOff, Users, MessageSquare, Hand, Monitor } from 'lucide-react'

// Classroom Environment Model
function ClassroomModel() {
  const { scene } = useGLTF('/classroom/scene.gltf')
  return <primitive object={scene} />
}

// Sitting Man Model - Represents male students and teacher
function SittingMan({ position, rotation = [0, 0, 0], scale = 1 }: {
  position: [number, number, number],
  rotation?: [number, number, number],
  scale?: number
}) {
  const { scene } = useGLTF('/man_sitting/scene.gltf')
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={scale} />
}

// Sitting Girl Model - Represents female students
function SittingGirl({ position, rotation = [0, 0, 0], scale = 1 }: {
  position: [number, number, number],
  rotation?: [number, number, number],
  scale?: number
}) {
  const { scene } = useGLTF('/sitting_girl/scene.gltf')
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={scale} />
}

// Standing Teacher Model (using sitting man but positioned to appear standing/teaching)
function Teacher({ position, rotation = [0, 0, 0] }: {
  position: [number, number, number],
  rotation?: [number, number, number]
}) {
  const { scene } = useGLTF('/man_sitting/scene.gltf')
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={1.1} />
}

function ClassroomScene() {
  return (
    <group>
      {/* Main Classroom Environment (contains desks, chairs, blackboard, floor, walls) */}
      <ClassroomModel />

      {/*
        TEACHER positioned at the front near the blackboard
        - Facing the students (rotation Y = Math.PI means facing forward)
        - Standing in front of the blackboard to explain the lesson
      */}
      <Teacher position={[0, 0, -5]} rotation={[0, Math.PI, 0]} />

      {/*
        STUDENTS sitting at desks in organized rows
        The classroom model should have desks/chairs already positioned
        We're placing students to sit at those desks

        Layout: 4 rows with 3-4 students each
        All students face forward toward the teacher and blackboard
      */}

      {/* Front Row - 4 students */}
      <SittingGirl position={[-3, 0, -2]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingMan position={[-1, 0, -2]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingGirl position={[1, 0, -2]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingMan position={[3, 0, -2]} rotation={[0, 0, 0]} scale={0.95} />

      {/* Second Row - 4 students */}
      <SittingMan position={[-3, 0, 0]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingGirl position={[-1, 0, 0]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingMan position={[1, 0, 0]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingGirl position={[3, 0, 0]} rotation={[0, 0, 0]} scale={0.95} />

      {/* Third Row - 4 students */}
      <SittingGirl position={[-3, 0, 2]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingMan position={[-1, 0, 2]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingGirl position={[1, 0, 2]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingMan position={[3, 0, 2]} rotation={[0, 0, 0]} scale={0.95} />

      {/* Back Row - 3 students */}
      <SittingMan position={[-2, 0, 4]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingGirl position={[0, 0, 4]} rotation={[0, 0, 0]} scale={0.95} />
      <SittingMan position={[2, 0, 4]} rotation={[0, 0, 0]} scale={0.95} />

      {/* Professional Classroom Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Ceiling lights simulation */}
      <pointLight position={[-4, 6, -2]} intensity={0.8} color="#FFF8E1" distance={12} />
      <pointLight position={[4, 6, -2]} intensity={0.8} color="#FFF8E1" distance={12} />
      <pointLight position={[-4, 6, 2]} intensity={0.8} color="#FFF8E1" distance={12} />
      <pointLight position={[4, 6, 2]} intensity={0.8} color="#FFF8E1" distance={12} />

      {/* Spotlight on the teacher/blackboard area */}
      <spotLight
        position={[0, 8, -3]}
        angle={0.6}
        intensity={1.2}
        castShadow
        target-position={[0, 1, -5]}
        penumbra={0.3}
      />
    </group>
  )
}

// Preload all GLTF models for better performance
useGLTF.preload('/classroom/scene.gltf')
useGLTF.preload('/man_sitting/scene.gltf')
useGLTF.preload('/sitting_girl/scene.gltf')

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
                <Canvas shadows camera={{ position: [0, 6, 14], fov: 60 }}>
                  <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 6, 14]} fov={60} />
                    <OrbitControls
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      maxPolarAngle={Math.PI / 2.2}
                      minPolarAngle={Math.PI / 6}
                      minDistance={8}
                      maxDistance={30}
                      target={[0, 2, -1]}
                      enableDamping
                      dampingFactor={0.05}
                    />
                    <ClassroomScene />
                    <color attach="background" args={['#0f172a']} />
                  </Suspense>
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
                <li>• Click and drag to rotate the camera around the classroom</li>
                <li>• Scroll to zoom in/out for closer inspection</li>
                <li>• Right-click and drag to pan across the room</li>
                <li>• Use the bottom controls for mic, camera, and classroom interactions</li>
                <li>• Explore the classroom to see the teacher explaining at the blackboard</li>
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
                  Participants (16)
                </h3>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  'Prof. David Martinez (Instructor)',
                  'Emma Johnson',
                  'Michael Chen',
                  'Sarah Williams',
                  'James Anderson',
                  'Olivia Garcia',
                  'William Brown',
                  'Sophia Davis',
                  'Robert Miller',
                  'Isabella Wilson',
                  'John Taylor',
                  'Mia Thomas',
                  'David Moore',
                  'Emily Jackson',
                  'Daniel White',
                  'Ava Harris'
                ].map((name, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-accent">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
                      {name[0]}
                    </div>
                    <span className="text-sm">{name}</span>
                    {i === 0 && <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">Instructor</span>}
                  </div>
                ))}
              </div>
            </Card>

            {/* Chat */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat
                </h3>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-3">
                <div className="text-sm">
                  <p className="font-medium text-xs text-muted-foreground mb-1">Prof. David Martinez</p>
                  <p className="bg-accent p-2 rounded">Welcome everyone! Today we'll explore advanced concepts in 3D web development.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-xs text-muted-foreground mb-1">Emma Johnson</p>
                  <p className="bg-accent p-2 rounded">Thank you Professor! Looking forward to this session.</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-xs text-muted-foreground mb-1">Michael Chen</p>
                  <p className="bg-accent p-2 rounded">This virtual classroom is incredible! So immersive!</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-xs text-muted-foreground mb-1">Sarah Williams</p>
                  <p className="bg-accent p-2 rounded">Can't wait to learn about Three.js and WebGL!</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 text-sm border rounded-md bg-background"
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
                  <span className="font-medium text-green-600">Live Session</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-medium">1h 30min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Topic:</span>
                  <span className="font-medium">3D Web Development</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Course:</span>
                  <span className="font-medium">Advanced Web Dev</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
