'use client';

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { AsciiRenderer } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
  type?: string;
  speed?: number;
}

function UrchinScene({ type = 'urchin', speed = 1 }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  // Create geometry based on type
  const geo = useMemo(() => {
    if (type === 'box') return new THREE.BoxGeometry(2, 2, 2);
    if (type === 'torus') return new THREE.TorusGeometry(1.5, 0.4, 16, 100);
    return new THREE.SphereGeometry(1.5, 64, 32);
  }, [type]);

  const origPos = useMemo(() => new Float32Array(geo.attributes.position.array), [geo]);

  // Spike logic for 'urchin' look
  const spikeParams = useMemo(() => {
    const n = origPos.length / 3;
    const out = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) {
      const h1 = Math.abs(Math.sin(i * 12.9898 + 78.233) * 43758.5453 % 1);
      const h2 = Math.abs(Math.sin(i * 93.989 + 27.333) * 21758.545 % 1);
      const spike = h1 > 0.85;
      out[i * 4 + 0] = spike ? 1.2 + h2 * 1.0 : 1.0; // multiplier
      out[i * 4 + 1] = Math.random(); // offset
    }
    return out;
  }, [origPos]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.2;
      meshRef.current.rotation.x = t * 0.1;
    }

    if (type === 'urchin' || type === 'sphere') {
      const posAttr = geo.attributes.position;
      const arr = posAttr.array as Float32Array;

      for (let i = 0; i < origPos.length; i += 3) {
        const vi = i / 3;
        const ox = origPos[i], oy = origPos[i + 1], oz = origPos[i + 2];
        const r = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / r, ny = oy / r, nz = oz / r;

        const mult = spikeParams[vi * 4 + 0];
        const phase = spikeParams[vi * 4 + 1];
        
        // Breathing effect
        const dist = mult * (1 + 0.1 * Math.sin(t * 2 + phase * Math.PI * 2));

        arr[i] = nx * dist;
        arr[i + 1] = ny * dist;
        arr[i + 2] = nz * dist;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshStandardMaterial color="white" roughness={0.1} metalness={0.1} />
    </mesh>
  );
}

export function AsciiPreview({ 
  type = 'urchin', 
  speed = 1,
  characters = ' ·.:=+*#@',
  resolution = 0.15,
  color = 'rgba(255,255,255,0.2)'
}) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#050507' }}>
      <Canvas dpr={1} camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={['#050507']} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <UrchinScene type={type} speed={speed} />
        <AsciiRenderer 
          fgColor={color}
          bgColor="#050507"
          characters={characters}
          resolution={resolution}
          invert={false}
        />
      </Canvas>
    </div>
  );
}
