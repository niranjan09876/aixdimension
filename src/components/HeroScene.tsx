import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense } from "react";

const Orb = ({ position, color, size = 1 }: { position: [number, number, number]; color: string; size?: number }) => (
  <Float speed={2} rotationIntensity={0.4} floatIntensity={1.5}>
    <mesh position={position}>
      <sphereGeometry args={[size, 64, 64]} />
      <MeshDistortMaterial color={color} roughness={0.1} metalness={0.8} distort={0.3} speed={2} />
    </mesh>
  </Float>
);

const HeroScene = () => (
  <div className="absolute inset-0 -z-10 opacity-60">
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#6366f1" />
        <Orb position={[-2.5, 1, -2]} color="#3B82F6" size={1.2} />
        <Orb position={[2.5, -0.5, -3]} color="#6366F1" size={0.9} />
        <Orb position={[0, 2, -4]} color="#8B5CF6" size={0.7} />
        <Orb position={[-1, -2, -2]} color="#22C55E" size={0.5} />
      </Suspense>
    </Canvas>
  </div>
);

export default HeroScene;
