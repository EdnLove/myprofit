import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const FloatingText = ({ text, isLocked }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  // Use a standard font from a CDN for safety
  const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <Text3D
          ref={meshRef}
          font={fontUrl}
          size={isLocked ? 1.5 : 2}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          <meshStandardMaterial
            color={isLocked ? "#ff0055" : "#00f3ff"}
            metalness={0.8}
            roughness={0.2}
            emissive={isLocked ? "#550000" : "#004455"}
          />
        </Text3D>
      </Center>
    </Float>
  );
};

const IdentityScene = ({ isLocked, text }) => {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#050505']} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={isLocked ? "#ff0000" : "#00ffff"} />
        <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={1} castShadow />

        {/* 3D Content */}
        <FloatingText text={text} isLocked={isLocked} />

        {/* Particles */}
        <Sparkles
          count={100}
          scale={10}
          size={2}
          speed={0.4}
          opacity={0.5}
          color={isLocked ? "#ffaa00" : "#00aaff"}
        />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* Overlay Scanline (optional, sticking to clean glassmorphism for now) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-black/50" />
    </div>
  );
};

export default IdentityScene;
