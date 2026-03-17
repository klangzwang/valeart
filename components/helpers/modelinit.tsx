"use client"

import React, { Suspense } from "react";
import { useGLTF, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import CanvasLoader from "./loader";

interface ModelProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const Model: React.FC<ModelProps> = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  const { scene } = useGLTF(modelPath, true);

  // Traverse the scene to adjust materials if needed
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material) {
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach((material) => {
        if (material && "side" in material) {
          material.needsUpdate = true;
        }
      });
    }
  });

  return (
    <primitive
      object={scene}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
};

interface ModelCanvasProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const ModelCanvas: React.FC<ModelCanvasProps> = ({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 5] }}
        shadows
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <hemisphereLight args={['white', 'gray', 0.4]} />
        <Suspense fallback={<CanvasLoader />}>
          <Model modelPath={modelPath} scale={scale} position={position} rotation={rotation} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export { Model };
export default ModelCanvas;
