import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleFlower = () => {
  const pointsRef = useRef();

  // Particle Count
  const count = 5000;

  // Generate Positions and Colors
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const color1 = new THREE.Color('#ff00ff'); // Magenta
    const color2 = new THREE.Color('#fff01f'); // Yellow
    const color3 = new THREE.Color('#39ff14'); // Green (Core)

    for (let i = 0; i < count; i++) {
      // Rose / Phyllotaxis Math
      // Spherical coordinates with noise/variation
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      // Flower shape modifier: varying radius based on angle
      // r = a + b * cos(k * theta)
      // Let's try a "rose" curve in 3D: r = sin(k * theta)
      const k = 3; // Number of petals
      const rBase = 2;
      const rMod = 1.5 * Math.sin(k * theta) * Math.sin(k * phi);

      const r = rBase + rMod + (Math.random() * 0.2); // Add fuzz

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color Gradient based on radius/distance
      const dist = Math.sqrt(x*x + y*y + z*z);
      const normalizedDist = Math.max(0, Math.min(1, (dist - 1) / 3));

      const mixedColor = color3.clone().lerp(color1, normalizedDist).lerp(color2, normalizedDist * normalizedDist);

      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.1;
      pointsRef.current.rotation.z = time * 0.05;

      // Pulse effect (scale)
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      pointsRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default ParticleFlower;
