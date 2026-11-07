import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AdditiveBlending, CanvasTexture, Color, SRGBColorSpace } from "three";

function createGalaxy() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const styles = getComputedStyle(document.documentElement);
  const readColor = (token: string) => {
    if (!ctx) return new Color();
    ctx.clearRect(0, 0, 64, 64);
    ctx.fillStyle = styles.getPropertyValue(token).trim();
    ctx.fillRect(0, 0, 1, 1);
    const pixel = ctx.getImageData(0, 0, 1, 1).data;
    return new Color().setRGB((pixel[0] ?? 255) / 255, (pixel[1] ?? 255) / 255, (pixel[2] ?? 255) / 255, SRGBColorSpace);
  };
  const core = readColor("--galaxy-core");
  const arm = readColor("--galaxy-arm");
  const star = readColor("--galaxy-star");
  if (ctx) {
    ctx.clearRect(0, 0, 64, 64);
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, styles.getPropertyValue("--galaxy-star").trim());
    gradient.addColorStop(0.15, styles.getPropertyValue("--galaxy-star").trim());
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  const count = 24000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  let seed = 7391;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  for (let i = 0; i < count; i++) {
    const bulge = i < 6500;
    const radius = bulge ? Math.pow(random(), 1.6) * 0.85 : Math.pow(random(), 0.7) * 3.5;
    const angle = bulge ? random() * Math.PI * 2 : (i % 4) * Math.PI / 2 + radius * 1.75;
    const spread = bulge ? 0.08 : 0.06 + radius * 0.12;
    const scatter = () => (random() + random() + random() - 1.5) * spread;
    positions[i * 3] = Math.cos(angle) * radius + scatter();
    positions[i * 3 + 1] = (random() + random() - 1) * (bulge ? 0.55 * (1 - radius) : 0.08 + radius * 0.025);
    positions[i * 3 + 2] = Math.sin(angle) * radius + scatter();
    const color = core.clone().lerp(arm, Math.min(radius / 2.4, 1));
    if (random() > 0.87) color.lerp(star, 0.8);
    color.multiplyScalar(0.65 + random() * 0.35);
    color.toArray(colors, i * 3);
  }
  return { positions, colors, texture };
}

function Galaxy({ onReady, onSelect }: { onReady: () => void; onSelect: () => void }) {
  const atlas = useMemo(createGalaxy, []);
  const ready = useRef(false);
  useEffect(() => () => atlas.texture.dispose(), [atlas]);
  useFrame(() => {
    if (!ready.current) { ready.current = true; onReady(); }
  });
  return (
    <group rotation={[0.08, 0, -0.2]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[atlas.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[atlas.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial map={atlas.texture} size={0.055} vertexColors transparent opacity={0.8} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </points>
      <mesh onClick={(event) => { if (event.delta <= 5) { event.stopPropagation(); onSelect(); } }}>
        <sphereGeometry args={[3.65, 24, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
    </group>
  );
}

export default function StarrstreamGalaxy({ onSelect, onReady }: { onSelect: () => void; onReady: () => void }) {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setAnimate(!preference.matches);
    sync();
    preference.addEventListener("change", sync);
    return () => preference.removeEventListener("change", sync);
  }, []);
  return (
    <Canvas frameloop={animate ? "always" : "demand"} dpr={[1, 1.5]} camera={{ position: [0, 5.2, 8.5], fov: 46 }} gl={{ alpha: true, antialias: true }}>
      <Galaxy onSelect={onSelect} onReady={onReady} />
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.08} rotateSpeed={0.65} autoRotate={animate} autoRotateSpeed={0.25} />
    </Canvas>
  );
}