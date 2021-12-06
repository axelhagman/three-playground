import React, { useRef, useState, forwardRef, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Html,
  useGLTF,
  softShadows,
  ScrollControls,
  useScroll,
  useTexture,
} from '@react-three/drei';
import styled from 'styled-components';
import useRefs from 'react-use-refs';

import Head from 'next/head';
import styles from '../styles/Home.module.css';

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`;

const Box = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    props.spinning ? (mesh.current.rotation.x += 0.01) : 0
  );
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
};

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) =>
  (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta);

const Composition = () => {
  const scroll = useScroll();
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
          1 + 0.24 * (1 - rsqw(r1)),
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
      <mesh ref={cube} scale={1}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
      <Html ref={text} className='data' position={[0, 0.1, 0]}>
        <h1>A simple cube!</h1>
      </Html>
    </>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ThreeJS test</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <ScrollControls pages={1} damping={10}>
              <Composition />
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
