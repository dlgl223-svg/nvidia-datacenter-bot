'use client';
import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, RoundedBox, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Layout of the build in 3D space. pos = assembled position,
// dir = direction (and distance) the part travels when exploded.
const LAYOUT = [
  { id: 'case', label: 'Lian Li O11D EVO', args: [4.2, 5, 4.2], pos: [0, 0, 0], dir: [0, 0, 0], color: '#7f8aa3', wire: true },
  { id: 'mobo', label: 'X670E-E Motherboard', args: [3, 4, 0.16], pos: [-0.2, 0.2, -1.7], dir: [0, 0, -2.2], color: '#ff2d75' },
  { id: 'cpu', label: 'Ryzen 9 9950X3D', args: [0.7, 0.7, 0.22], pos: [-0.7, 0.95, -1.5], dir: [-1.4, 1.6, 0], color: '#ed1c24' },
  { id: 'ram', label: '32GB DDR5-6000', args: [0.55, 1.5, 0.18], pos: [0.55, 0.85, -1.5], dir: [1.6, 1.7, 0], color: '#9b7dff', stack: 2 },
  { id: 'cooler', label: 'Arctic LF III 360', args: [0.42, 3.4, 2.9], pos: [-2.0, 0.2, 0], dir: [-2.4, 0, 0], color: '#22d3ee' },
  { id: 'pump', label: '', args: [0.7, 0.7, 0.5], pos: [-0.7, 0.95, -1.2], dir: [-2.2, 1.6, 0], color: '#22d3ee', sub: true },
  { id: 'gpu', label: 'RTX 4090', args: [3.1, 0.5, 1.5], pos: [0, -0.5, -0.5], dir: [0, 0, 2.6], color: '#76b900' },
  { id: 'ssd', label: '990 Pro 2TB', args: [0.9, 0.12, 0.32], pos: [0.4, -0.2, -1.55], dir: [0.4, -1.3, 0], color: '#3b82f6' },
  { id: 'psu', label: '1000W PSU', args: [1.7, 1.0, 2.2], pos: [0.9, -2.0, -0.4], dir: [0, -2.2, 0], color: '#f4c042' },
];

function lerp(a, b, t) { return a + (b - a) * t; }

function Part({ p, explode, selected, bought, onSelect }) {
  const ref = useRef();
  const [hover, setHover] = useState(false);
  useFrame(() => {
    if (!ref.current) return;
    const t = explode;
    ref.current.position.set(
      lerp(p.pos[0], p.pos[0] + p.dir[0], t),
      lerp(p.pos[1], p.pos[1] + p.dir[1], t),
      lerp(p.pos[2], p.pos[2] + p.dir[2], t)
    );
    const target = hover || selected ? 1.04 : 1;
    ref.current.scale.x += (target - ref.current.scale.x) * 0.2;
    ref.current.scale.y = ref.current.scale.z = ref.current.scale.x;
  });

  const emissive = bought ? '#1fbf6b' : selected ? '#7df9ff' : hover ? p.color : '#000000';
  const emissiveIntensity = bought ? 0.5 : selected ? 0.7 : hover ? 0.45 : 0;

  const handle = (e) => { e.stopPropagation(); onSelect && onSelect(p.id); };

  if (p.wire) {
    return (
      <mesh ref={ref}>
        <boxGeometry args={p.args} />
        <meshStandardMaterial color={p.color} transparent opacity={0.06} />
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(...p.args)]} />
          <lineBasicMaterial color="#3a4d6b" attach="material" />
        </lineSegments>
      </mesh>
    );
  }

  const stacks = p.stack || 1;
  return (
    <group
      ref={ref}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true); }}
      onPointerOut={() => setHover(false)}
      onClick={handle}
    >
      {Array.from({ length: stacks }).map((_, i) => (
        <RoundedBox key={i} args={p.args} radius={0.04} smoothness={3} position={[i * (p.args[0] + 0.18), 0, 0]}>
          <meshStandardMaterial
            color={p.color}
            metalness={0.45}
            roughness={0.35}
            emissive={emissive}
            emissiveIntensity={emissiveIntensity}
          />
        </RoundedBox>
      ))}
      {(hover || selected) && p.label && (
        <Html center distanceFactor={9} position={[0, p.args[1] / 2 + 0.4, 0]} style={{ pointerEvents: 'none' }}>
          <div style={{
            whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: 11, padding: '4px 8px',
            background: 'rgba(8,10,18,0.92)', color: bought ? '#54e6a0' : '#bfe9ef',
            border: `1px solid ${bought ? '#1fbf6b' : '#2b4f57'}`, borderRadius: 6,
          }}>
            {bought ? '✓ ' : ''}{p.label}
          </div>
        </Html>
      )}
    </group>
  );
}

function Scene({ explode, selectedId, boughtIds, onSelect }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} />
      <directionalLight position={[-6, 3, -4]} intensity={0.5} color="#7df9ff" />
      <pointLight position={[0, -2, 4]} intensity={0.6} color="#76b900" />
      {LAYOUT.map((p) => (
        <Part
          key={p.id}
          p={p}
          explode={explode}
          selected={selectedId === p.id}
          bought={boughtIds?.has(p.id)}
          onSelect={onSelect}
        />
      ))}
      <ContactShadows position={[0, -2.7, 0]} opacity={0.5} scale={12} blur={2.4} far={5} color="#000000" />
      <OrbitControls enablePan={false} minDistance={6} maxDistance={16} autoRotate={explode < 0.02} autoRotateSpeed={0.6} target={[0, 0, 0]} />
    </>
  );
}

export default function Build3D({ explode = 0, selectedId, boughtIds, onSelect }) {
  return (
    <Canvas camera={{ position: [7, 3.5, 8], fov: 42 }} dpr={[1, 2]} style={{ touchAction: 'none' }}>
      <color attach="background" args={['#070811']} />
      <fog attach="fog" args={['#070811', 14, 26]} />
      <Scene explode={explode} selectedId={selectedId} boughtIds={boughtIds} onSelect={onSelect} />
    </Canvas>
  );
}
