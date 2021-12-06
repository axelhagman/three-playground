import React, { useRef, useState, forwardRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {
  Html,
  useGLTF,
  softShadows,
  ScrollControls,
  useScroll,
  useTexture,
} from '@react-three/drei';
import useRefs from 'react-use-refs';

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

const Composition = () => {
  const scroll = useScroll();
  const { nodes } = useLoader(GLTFLoader, '/rounded_cube.gltf');
  const { width, height } = useThree((state) => state.viewport);
  const [cube, text] = useRefs();
  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 3, 3 / 3);
    const r2 = scroll.range(2 / 3, 1 / 3);
    cube.current.rotation.y = THREE.MathUtils.damp(
      cube.current.rotation.y,
      (-Math.PI / 1.45) * r1,
      4,
      delta
    );
    cube.current.position.x = THREE.MathUtils.damp(
      cube.current.position.x,
      (-width / 7) * r1,
      4,
      delta
    );
    cube.current.scale.x =
      cube.current.scale.y =
      cube.current.scale.z =
        THREE.MathUtils.damp(
          cube.current.scale.z,
          0.5 + 0.24 * (1 - rsqw(r1)),
          4,
          delta
        );
    text.current.classList.toggle('show', r2);
  });
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <Box position={[-1.2, 0, 0]} spinning /> */}
      <mesh ref={cube} scale={0.5} geometry={nodes.Cube.geometry}>
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <Html ref={text} className='data' position={[0, 0.1, 0]}>
        <h1>A simple cube!</h1>
      </Html>
    </>
  );
};

const CubeScene = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 5] }}>
        <Suspense fallback={null}>
          <ScrollControls pages={1} damping={10}>
            <Composition />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default CubeScene;
