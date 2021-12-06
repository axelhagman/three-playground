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
  RoundedBox,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei';
import useRefs from 'react-use-refs';
import { useSpring, animated, config } from '@react-spring/three';

const Composition = () => {
  const [active, setActive] = useState(false);
  const [clickable] = useRefs();
  const { scale, position, rotation } = useSpring({
    scale: active ? 1 : 0.5,
    position: active ? [0.75, 0, 0.4] : [-0.75, 0, 0.25],
    rotation: active ? [0, 0, Math.PI] : [0, 0, Math.PI * 0.5],
    config: config.wobbly,
  });

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <RoundedBox args={[2.5, 1, 0.2]} radius={0.05} smoothness={4}>
        <meshPhongMaterial attach='material' color={active ? 'green' : 'red'} />
      </RoundedBox>
      <animated.mesh
        position={position}
        scale={scale}
        rotation={rotation}
        ref={clickable}
        onClick={() => setActive(!active)}
      >
        <RoundedBox args={[1, 1, 0.5]}>
          <meshPhongMaterial attach='material' color='gray' />
        </RoundedBox>
      </animated.mesh>
    </>
  );
};

const SwtichScene = () => {
  return (
    <div style={{ width: '100vw', height: '90vh' }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} />
        <OrbitControls
          enablePan={false}
          enableRotate={true}
          enableZoom={false}
          maxPolarAngle={Math.PI * 0.8}
          minPolarAngle={Math.PI * 0.2}
          maxAzimuthAngle={Math.PI * 0.5}
          minAzimuthAngle={-Math.PI * 0.5}
        />
        <Suspense fallback={null}>
          <Composition />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SwtichScene;
