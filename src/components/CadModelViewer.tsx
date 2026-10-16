"use client";

import { Suspense, useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import * as THREE from "three";

function STLModel({ url }: { url: string }) {
  const geometry = useLoader(STLLoader, url) as THREE.BufferGeometry;

  const { geo, scale } = useMemo(() => {
    const clonedGeometry = geometry.clone();
    clonedGeometry.computeBoundingBox();
    const size = new THREE.Vector3();
    clonedGeometry.boundingBox!.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    clonedGeometry.center();
    return { geo: clonedGeometry, scale: 2.4 / maxDim };
  }, [geometry]);

  return (
    <mesh geometry={geo} scale={scale} rotation={[-Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#c9d3df" metalness={0.65} roughness={0.35} />
    </mesh>
  );
}

export default function CadModelViewer({ url }: { url: string }) {
  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [3, 2, 4], fov: 45 }} dpr={[1, 1.5]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 6, 5]} intensity={1.1} />
          <pointLight position={[-4, -2, -4]} intensity={0.4} color="#2dd7f0" />
          <STLModel url={url} />
          <Environment preset="studio" />
          <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Suspense>
      </Canvas>
      <span className="font-mono-eng pointer-events-none absolute bottom-3 right-3 rounded-full bg-bg/70 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-cyan backdrop-blur">
        Drag to orbit · Scroll to zoom
      </span>
    </div>
  );
}