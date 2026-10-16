"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import SectionHeading from "./SectionHeading";

function buildGearShape(teeth: number, innerR: number, outerR: number) {
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.5;
    const a2 = a0 + step;
    const r0 = innerR;
    const r1 = outerR;
    if (i === 0) {
      shape.moveTo(Math.cos(a0) * r0, Math.sin(a0) * r0);
    }
    shape.lineTo(Math.cos(a0) * r1, Math.sin(a0) * r1);
    shape.lineTo(Math.cos(a1) * r1, Math.sin(a1) * r1);
    shape.lineTo(Math.cos(a2) * r0, Math.sin(a2) * r0);
  }
  shape.closePath();

  const hole = new THREE.Path();
  hole.absarc(0, 0, innerR * 0.35, 0, Math.PI * 2, true);
  shape.holes.push(hole);

  return shape;
}

function Gear() {
  const ref = useRef<THREE.Mesh>(null);
  const shape = buildGearShape(14, 1.0, 1.35);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.03,
    bevelSegments: 2,
  });

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.25;
  });

  return (
    <mesh ref={ref} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color="#1c2b45"
        metalness={0.9}
        roughness={0.25}
        emissive="#2dd7f0"
        emissiveIntensity={0.12}
      />
    </mesh>
  );
}

export default function GearScene() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeading
        index="09"
        eyebrow="MECHANISM"
        title="A gear, rendered the way it's designed"
        description="Drag to orbit. A small nod to the mechanism-design work behind the Engine Lifter project."
      />

      <div className="glass mx-auto h-[380px] w-full max-w-2xl overflow-hidden rounded-2xl sm:h-[440px]">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 4, 5]} intensity={1.2} />
            <pointLight position={[-3, -2, -4]} intensity={0.6} color="#2dd7f0" />
            <Gear />
            <Environment preset="city" />
            <OrbitControls
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.6}
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
