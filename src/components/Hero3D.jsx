import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Soft radial glow drawn once on a canvas and reused by every lantern.
function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(255,214,140,1)');
    grad.addColorStop(0.25, 'rgba(242,179,61,0.55)');
    grad.addColorStop(1, 'rgba(242,179,61,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
}

function Lantern({ position, scale = 1, speed = 1, glow }) {
  const flame = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (flame.current) flame.current.intensity = 2.2 + Math.sin(t * 7) * 0.3 + Math.sin(t * 13) * 0.2;
  });
  const frame = <meshStandardMaterial color="#3a2618" roughness={0.6} metalness={0.4} />;
  return (
    <Float speed={speed * 1.4} rotationIntensity={0.35} floatIntensity={1.4}>
      <group position={position} scale={scale}>
        {/* cap and handle */}
        <mesh position={[0, 0.62, 0]}>
          <coneGeometry args={[0.42, 0.3, 4]} />
          {frame}
        </mesh>
        <mesh position={[0, 0.86, 0]}>
          <torusGeometry args={[0.12, 0.025, 8, 20]} />
          {frame}
        </mesh>
        {/* glowing glass */}
        <mesh>
          <boxGeometry args={[0.5, 0.9, 0.5]} />
          <meshStandardMaterial
            color="#ffb04a"
            emissive="#ff9a1f"
            emissiveIntensity={1.6}
            transparent
            opacity={0.9}
            toneMapped={false}
          />
        </mesh>
        {/* frame bars */}
        {[[-0.26, -0.26], [0.26, -0.26], [-0.26, 0.26], [0.26, 0.26]].map(([x, z], i) => (
          <mesh key={i} position={[x, 0, z]}>
            <boxGeometry args={[0.06, 0.98, 0.06]} />
            {frame}
          </mesh>
        ))}
        <mesh position={[0, -0.5, 0]}>
          <boxGeometry args={[0.6, 0.08, 0.6]} />
          {frame}
        </mesh>
        <sprite scale={[3.2, 3.2, 1]}>
          <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.75} />
        </sprite>
        <pointLight ref={flame} color="#ffb347" intensity={2.2} distance={6} decay={2} />
      </group>
    </Float>
  );
}

// A golden twenty-sided die wrapped in slowly turning rune rings.
function RuneDie() {
  const die = useRef();
  const rings = useRef();
  useFrame((_, dt) => {
    die.current.rotation.x += dt * 0.25;
    die.current.rotation.y += dt * 0.35;
    rings.current.rotation.z += dt * 0.15;
    rings.current.children[1].rotation.x += dt * 0.4;
  });
  return (
    <Float speed={1.2} floatIntensity={0.8} rotationIntensity={0.2}>
      <group position={[4.4, 1.5, -3]} scale={0.8}>
        <mesh ref={die}>
          <icosahedronGeometry args={[1.1, 0]} />
          <meshStandardMaterial color="#f2b33d" emissive="#7a4a10" emissiveIntensity={0.6} metalness={0.55} roughness={0.3} flatShading />
          <mesh scale={1.004}>
            <icosahedronGeometry args={[1.1, 0]} />
            <meshBasicMaterial color="#fff1c9" wireframe transparent opacity={0.35} />
          </mesh>
        </mesh>
        <group ref={rings}>
          <mesh rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[1.9, 0.015, 8, 120]} />
            <meshBasicMaterial color="#f2b33d" toneMapped={false} />
          </mesh>
          <mesh rotation={[0, Math.PI / 3, 0]}>
            <torusGeometry args={[2.25, 0.01, 8, 120]} />
            <meshBasicMaterial color="#9fc6ff" transparent opacity={0.6} toneMapped={false} />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

// Eases the camera toward the pointer for a gentle parallax.
function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0.8, 0, 0);
  });
  return null;
}

function Scene() {
  const glow = useGlowTexture();
  return (
    <>
      <color attach="background" args={['#0b101b']} />
      <fog attach="fog" args={['#0b101b', 8, 22]} />
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} color="#ffe2b0" />
      <directionalLight position={[-6, -2, -4]} intensity={0.6} color="#4a7bd0" />
      <Stars radius={60} depth={30} count={2500} factor={3} saturation={0} fade speed={0.6} />
      <Sparkles count={120} scale={[16, 8, 8]} size={3} speed={0.35} color="#ffcf7a" opacity={0.8} />
      <RuneDie />
      <Lantern position={[-5.8, 2.6, -3]} scale={0.8} speed={0.9} glow={glow} />
      <Lantern position={[5.4, 2.4, -3]} scale={0.6} speed={1.1} glow={glow} />
      <Lantern position={[0.4, -2.2, -1.5]} scale={0.55} speed={1.3} glow={glow} />
      <Lantern position={[-6, -1, -4]} scale={0.7} speed={0.8} glow={glow} />
      <Lantern position={[6.5, -1.8, -2]} scale={0.5} speed={1.2} glow={glow} />
      <CameraRig />
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
    >
      <Scene />
    </Canvas>
  );
}
