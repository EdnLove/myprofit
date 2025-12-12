import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Float, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const TitaniumText = ({ text, isLocked }) => {
  const meshRef = useRef();
  const [hovered, setHover] = useState(false);

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

  const fontUrl = 'https://threejs.org/examples/fonts/helvetiker_bold.typeface.json';

  return (
    <group>
      <Center>
        <Text3D
          ref={meshRef}
          font={fontUrl}
          size={isLocked ? 1.2 : 1.8}
          height={0.1}
          curveSegments={24} // Smoother curves
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={10} // High quality bevel
          onPointerOver={() => setHover(true)}
          onPointerOut={() => setHover(false)}
        >
          {text}
          <meshPhysicalMaterial
            color={isLocked ? "#333" : "#f5f5f7"} // Dark grey vs Apple White
            roughness={0.2}  // Semi-polished
            metalness={1.0}  // Full metal
            clearcoat={0.5}  // Clear coat for that "iPhone Pro" glass/metal look
            clearcoatRoughness={0.1}
            emissive={isLocked ? "#220000" : "#000"}
            emissiveIntensity={0.2}
          />
        </Text3D>
      </Center>
    </group>
  );
};

const IdentityScene = ({ isLocked, text }) => {
  return (
    <div className="w-full h-full min-h-[300px] relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 6], fov: 35 }}>
        {/* Studio Lighting */}
        <Environment preset="studio" />

        <ambientLight intensity={0.5} />

        {/* Rim Light for that "Pro" product reveal look */}
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
          color="#2997ff" // Subtle Apple Blue rim light
        />

        <TitaniumText text={text} isLocked={isLocked} />

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
