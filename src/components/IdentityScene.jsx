import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const WireframeText = ({ text }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    }
  });

  const fontUrl = '/fonts/helvetiker_bold.typeface.json';

  return (
    <group>
      <Center>
        <Text3D
          ref={meshRef}
          font={fontUrl}
          size={1.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {text}
          {/* Tech/Cyber Material */}
          <meshStandardMaterial
            color="#238636" // GitHub Green
            emissive="#00ff00"
            emissiveIntensity={0.2}
            wireframe={true} // Cyber aesthetic
          />
        </Text3D>
      </Center>
    </group>
  );
};

const IdentityScene = ({ isLocked }) => {
  // Always English
  const text = isLocked ? "LOCKED" : "YAN YUQI";

  return (
    <div className="w-full h-full min-h-[300px] relative cursor-grab active:cursor-grabbing bg-[#0d1117]">
       {/* Grid Background Effect */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
            backgroundImage: 'linear-gradient(#30363d 1px, transparent 1px), linear-gradient(90deg, #30363d 1px, transparent 1px)',
            backgroundSize: '40px 40px'
        }}
      ></div>

      <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff00" />
        <WireframeText text={text} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minAzimuthAngle={-0.2}
          maxAzimuthAngle={0.2}
        />
      </Canvas>
    </div>
  );
};

export default IdentityScene;
