"use client"

import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import * as THREE from "three";
import  SketchfabEmbed  from "./canvas"; // Asegúrate de tener este componente

const ThreeDTextOverlay = ({ modelId }) => {
  const [font, setFont] = useState(null);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load("/path/to/font.json", (loadedFont) => {
      setFont(loadedFont);
    });
  }, []);

  return (
    <div className="relative w-full h-screen">
      {/* Iframe de Sketchfab */}
      <SketchfabEmbed modelId={modelId} />

      {/* Canvas de React Three Fiber */}
      {font && (
        <Canvas
          className="absolute top-0 left-0 w-full h-full"
          camera={{ position: [0, 0, 5] }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <OrbitControls />
          <mesh position={[0, 0, 0]}>
            <THREE.TextGeometry args={["Bienvenido a nuestra galería virtual", { font, size: 1, height: 0.1 }]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </Canvas>
      )}
    </div>
  );
};

export default ThreeDTextOverlay;
