import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TitaniumText = ({ text, isLocked, isDark }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      // Gentle floating
      meshRef.current.position.y = Math.sin(time * 0.3) * 0.05;

      // Subtle Mouse Parallax
      const targetRotX = -state.mouse.y * 0.2;
      const targetRotY = state.mouse.x * 0.2;

      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotX, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotY, 0.05);
    }
  });

  const fontUrl = '/fonts/helvetiker_bold.typeface.json';

  // Material properties based on theme
  const materialProps = isDark ? {
    color: isLocked ? "#333" : "#f5f5f7",
    emissive: isLocked ? "#220000" : "#000",
  } : {
    color: isLocked ? "#888" : "#1d1d1f",
    emissive: "#000",
  };

  return (
    <group>
      <Center>
        <Text3D
          ref={meshRef}
          font={fontUrl}
          size={isLocked ? 1.2 : 1.8}
          height={0.1}
          curveSegments={24}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={10}
        >
          {text}
          <meshPhysicalMaterial
            {...materialProps}
            roughness={0.2}
            metalness={1.0}
            clearcoat={0.5}
            clearcoatRoughness={0.1}
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
};

const IdentityScene = ({ isLocked, text }) => {
  const [isDark, setIsDark] = useState(true);

  // Detect theme change
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);

    const handler = (e) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="w-full h-full min-h-[300px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        {/* Studio Lighting - Adapts to Light/Dark slightly */}
        <Environment preset="studio" />

        <ambientLight intensity={isDark ? 0.5 : 0.8} />

        <spotLight
          position={[10, 10, 5]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          color="#ffffff"
        />
        <spotLight
          position={[-10, 0, -5]}
          angle={0.5}
          penumbra={1}
          intensity={2}
          color="#2997ff"
        />

        <TitaniumText text={text} isLocked={isLocked} isDark={isDark} />

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
