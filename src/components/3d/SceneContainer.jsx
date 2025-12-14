import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleFlower from './ParticleFlower';

const SceneContainer = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]} // Optimization for high DPI screens
      >
        <color attach="background" args={['#000000']} />

        {/* Ambient Fog for depth */}
        <fog attach="fog" args={['#000000', 5, 15]} />

        <ParticleFlower />

        {/* Aura / Glow Light */}
        <pointLight position={[0, 0, 0]} intensity={2} color="#39ff14" distance={5} />
        <ambientLight intensity={0.2} />

        <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      {/* Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] opacity-80"></div>
    </div>
  );
};

export default SceneContainer;
