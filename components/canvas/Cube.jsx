import React, { Suspense, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion"
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader";
import * as THREE from "three";
import CanvasLoader from "../loader";

const CubeModel = () => {
  const { scene } = useGLTF(
    "./Cube/Cube.gltf",
    undefined,
    (loader) => {
      const dracoLoader = new DRACOLoader();
      loader.setDRACOLoader(dracoLoader);
    }
  );

  // Ensure the cube is visible from the inside (inverted normals) like a skybox.
  scene.traverse((child) => {
    if (child.isMesh && child.material) {
      const materials = Array.isArray(child.material)
        ? child.material
        : [child.material];
      materials.forEach((material) => {
        if (material && "side" in material) {
          //material.side = THREE.BackSide;
          material.needsUpdate = true;
        }
      });
    }
  });

  return (
    <primitive object={scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

const CubeCanvas = () => {
  const controlsRef = useRef();
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  }, []);

  return (
    <footer ref={ref} className="border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 py-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-8"
        ></motion.div>

        <Canvas
          frameloop="always"
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          camera={{ fov: 45, near: 0.1, far: 200, position: [0, 0, 5] }}
          shadows
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <hemisphereLight skyColor="white" groundColor="gray" intensity={0.4} />
          <OrbitControls
            ref={controlsRef}
            autoRotate
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Suspense fallback={<CanvasLoader />}>
            <CubeModel />
          </Suspense>
          <Preload all />
        </Canvas>
      </div>
    </footer>
  );
};

export default CubeCanvas;
