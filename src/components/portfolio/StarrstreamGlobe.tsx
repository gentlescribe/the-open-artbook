import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { CanvasTexture, SRGBColorSpace } from "three";

function makeAtlas() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return new CanvasTexture(canvas);
  const styles = getComputedStyle(document.documentElement);
  const palette = ["--globe-ocean", "--globe-land", "--globe-highland"].map((token) => {
    ctx.fillStyle = styles.getPropertyValue(token).trim();
    ctx.fillRect(0, 0, 1, 1);
    return Array.from(ctx.getImageData(0, 0, 1, 1).data).slice(0, 3);
  });
  const islands = Array.from({ length: 14 }, (_, i): [number, number, number, number] => {
    const lat = Math.asin(1 - 2 * (i + 0.5) / 14);
    const lon = i * 2.39996;
    return [Math.cos(lat) * Math.cos(lon), Math.sin(lat), Math.cos(lat) * Math.sin(lon), 0.025 + ((i * 7) % 11) * 0.009];
  });
  const pixels = ctx.createImageData(canvas.width, canvas.height);
  for (let y = 0; y < canvas.height; y++) {
    const lat = (0.5 - y / canvas.height) * Math.PI;
    for (let x = 0; x < canvas.width; x++) {
      const lon = x / canvas.width * Math.PI * 2;
      const sx = Math.cos(lat) * Math.cos(lon), sy = Math.sin(lat), sz = Math.cos(lat) * Math.sin(lon);
      const ripple = Math.sin(sx * 23 + sy * 13) * Math.cos(sz * 19 - sx * 7) * 0.015;
      let height = -1;
      for (const island of islands) {
        height = Math.max(height, island[0] * sx + island[1] * sy + island[2] * sz - 1 + island[3] + ripple);
      }
      const color = palette[height > 0.055 ? 2 : height > 0 ? 1 : 0];
      if (!color) continue;
      const noise = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      const grain = 0.92 + 0.06 * (noise - Math.floor(noise));
      const p = (y * canvas.width + x) * 4;
      for (let c = 0; c < 3; c++) pixels.data[p + c] = (color[c] ?? 0) * grain;
      pixels.data[p + 3] = 255;
    }
  }
  ctx.putImageData(pixels, 0, 0);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function Planet({ onSelect, onReady }: { onSelect: () => void; onReady: () => void }) {
  const texture = useMemo(makeAtlas, []);
  const ready = useRef(false);
  useEffect(() => () => texture.dispose(), [texture]);
  useFrame(() => {
    if (!ready.current) { ready.current = true; onReady(); }
  });
  return (
    <mesh rotation={[0.12, -0.5, 0]} onClick={(event) => { if (event.delta <= 5) { event.stopPropagation(); onSelect(); } }}>
      <sphereGeometry args={[2, 64, 48]} />
      <meshStandardMaterial map={texture} roughness={0.78} metalness={0.15} />
    </mesh>
  );
}

export default function StarrstreamGlobe({ onSelect, onReady }: { onSelect: () => void; onReady: () => void }) {
  return (
    <Canvas frameloop="demand" dpr={[1, 1.5]} camera={{ position: [0, 0, 6.8], fov: 42 }} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 4]} intensity={2.5} />
      <Environment resolution={64}>
        <Lightformer intensity={1.5} position={[-4, 3, 2]} scale={[6, 6, 1]} />
        <Lightformer intensity={0.7} position={[3, -2, 3]} scale={[4, 4, 1]} />
      </Environment>
      <Planet onSelect={onSelect} onReady={onReady} />
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} rotateSpeed={0.65} />
    </Canvas>
  );
}