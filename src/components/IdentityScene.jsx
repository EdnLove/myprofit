import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Sparkles, OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

const InteractiveText = ({ text, isLocked }) => {
  const meshRef = useRef();

  // Mouse interaction state
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle idle animation
      const time = state.clock.elapsedTime;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;

      // Mouse interaction (Parallax look)
      // state.mouse.x/y are normalized coordinates (-1 to 1)
      const targetRotX = -state.mouse.y * 0.5; // Look up/down
      const targetRotY = state.mouse.x * 0.5;  // Look left/right

      // Smooth lerp to target rotation
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.1);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.1);
    }
  });

  const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';

  return (
    <group>
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
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {text}
          <meshStandardMaterial
            color={isLocked ? "#ff0055" : (hovered ? "#ffffff" : "#00f3ff")}
            metalness={0.9}
            roughness={0.1}
            emissive={isLocked ? "#550000" : "#004455"}
            emissiveIntensity={hovered ? 2 : 1}
          />
        </Text3D>
      </Center>
    </group>
  );
};

const IdentityScene = ({ isLocked, text }) => {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden bg-black/40 backdrop-blur-md border border-white/10 shadow-2xl relative">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        {/* Environment for shiny reflections */}
        <Environment preset="city" />

        <color attach="background" args={['#050505']} />

        {/* Dynamic Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={isLocked ? "#ff0000" : "#00ffff"} />
        <spotLight position={[0, 10, 0]} angle={0.5} penumbra={1} intensity={2} castShadow />

        {/* 3D Content */}
        <InteractiveText text={text} isLocked={isLocked} />

        {/* Particles */}
        <Sparkles
          count={150}
          scale={12}
          size={3}
          speed={0.4}
          opacity={0.5}
          color={isLocked ? "#ffaa00" : "#00aaff"}
        />

        {/* Controls - Restricted to avoid breaking the view, but allowing subtle movement */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.5}
          maxPolarAngle={Math.PI / 2 + 0.5}
          minAzimuthAngle={-0.5}
          maxAzimuthAngle={0.5}
        />
      </Canvas>

      <div className="absolute bottom-4 right-4 text-xs text-white/30 font-mono pointer-events-none">
        INTERACTIVE 3D
      </div>
    </div>
  );
};

export default IdentityScene;
