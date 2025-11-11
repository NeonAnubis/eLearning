import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Video, Mic, MicOff, VideoOff, Users, MessageSquare, Hand, Monitor } from 'lucide-react'

// Classroom Model Component
function ClassroomModel() {
  const { scene } = useGLTF('/classroom/scene.gltf')
  return <primitive object={scene} scale={1.5} position={[0, 0, 0]} />
}

// Sitting Man Model Component
function SittingMan({ position, rotation = [0, 0, 0], scale = 0.8 }: {
  position: [number, number, number],
  rotation?: [number, number, number],
  scale?: number
}) {
  const { scene } = useGLTF('/man_sitting/scene.gltf')
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={scale} />
}

// Sitting Girl Model Component
function SittingGirl({ position, rotation = [0, 0, 0], scale = 0.8 }: {
  position: [number, number, number],
  rotation?: [number, number, number],
  scale?: number
}) {
  const { scene } = useGLTF('/sitting_girl/scene.gltf')
  return <primitive object={scene.clone()} position={position} rotation={rotation} scale={scale} />
}

function ClassroomScene() {
  return (
    <group>
      {/* Main Classroom Environment */}
      <ClassroomModel />

      {/* Students - Mix of sitting men and women positioned around the classroom */}
      {/* Row 1 - Front row students */}
      <SittingMan position={[-2.5, 0, 1]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingGirl position={[-1.2, 0, 1]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingMan position={[0, 0, 1]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingGirl position={[1.2, 0, 1]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingMan position={[2.5, 0, 1]} rotation={[0, 0, 0]} scale={0.7} />

      {/* Row 2 - Middle row students */}
      <SittingGirl position={[-2.5, 0, 2.5]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingMan position={[-1.2, 0, 2.5]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingGirl position={[0, 0, 2.5]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingMan position={[1.2, 0, 2.5]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingGirl position={[2.5, 0, 2.5]} rotation={[0, 0, 0]} scale={0.7} />

      {/* Row 3 - Back row students */}
      <SittingMan position={[-2.5, 0, 4]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingGirl position={[-1.2, 0, 4]} rotation={[0, 0, 0]} scale={0.7} />
      <SittingMan position={[0, 0, 4]} rotation={[0, 0, 0]} scale={0.7} />

      {/* Teacher at the front */}
      <SittingMan position={[0, 0, -2]} rotation={[0, Math.PI, 0]} scale={0.8} />

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <pointLight position={[-5, 5, 2]} intensity={0.6} color="#FFF4E6" />
      <pointLight position={[5, 5, 2]} intensity={0.6} color="#FFF4E6" />
      <spotLight position={[0, 8, -2]} angle={0.5} intensity={1} castShadow />
    </group>
  )
}

// Preload the models
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
                <Canvas shadows style={{ width: '100%', height: '100%' }}>
                  <PerspectiveCamera makeDefault position={[0, 5, 12]} />
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    maxPolarAngle={Math.PI / 2.1}
                    minDistance={5}
                    maxDistance={25}
                    target={[0, 2, 0]}
                  />
                  <ClassroomScene />
                  <color attach="background" args={['#1a1a2e']} />
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
                  Participants (14)
                </h3>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {['Dr. Sarah Johnson (Instructor)', 'John Doe', 'Alice Smith', 'Bob Wilson', 'Emma Davis', 'Michael Chen', 'Lisa Garcia', 'David Kim', 'Sarah Lopez', 'Tom Anderson', 'Maria Rodriguez', 'James Taylor', 'Emily White', 'Chris Brown'].map((name, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-accent">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
                      {name[0]}
                    </div>
                    <span className="text-sm">{name}</span>
                    {i === 0 && <span className="text-xs bg-primary/20 px-2 py-0.5 rounded">Host</span>}
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
