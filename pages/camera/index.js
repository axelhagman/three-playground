import React, { useRef, useState, forwardRef, Suspense } from 'react';
import styled from 'styled-components';
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
  ContactShadows,
  RoundedBox,
  Cylinder,
  Scroll,
  OrbitControls,
  Environment,
} from '@react-three/drei';
import useRefs from 'react-use-refs';

import BasicInfo from './components/BasicInfo';

const SceneContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
`;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #1b1b22;
  z-index: -2;
`;

const BackgroundCircle = styled.div`
  position: absolute;
  width: 80vw;
  height: 80vw;
  right: 10vw;
  top: 0;
  background: radial-gradient(rgba(190, 0, 232, 0.8), rgba(190, 0, 232, 0) 70%);
  z-index: -1;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  margin-top: 5rem;
  transition: opacity ease 0.5s;
  opacity: 1;
`;

const BasicInfoRef = styled.div`
  opacity: 0;
  transition: opacity ease 0.5s;
  margin: auto 0;
  margin-left: 3rem;
`;

const FadeTitleContainer = styled.div`
  -webkit-mask-image: -webkit-linear-gradient(
    top,
    rgba(0, 0, 0, 1) 10%,
    rgba(0, 0, 0, 0) 85%
  );
`;

const CameraHead = ({ children }) => {
  const ref = useRef();
  useFrame((state) => {
    // Horizontal
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      (state.mouse.x * Math.PI) / 10,
      0.2
    );

    // Vertical
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      (-state.mouse.y * Math.PI) / 15,
      0.2
    );
  });
  return <group ref={ref}>{children}</group>;
};

const CameraBody = () => {
  const { scene, nodes, materials } = useLoader(
    GLTFLoader,
    '/Camera_Body.gltf'
  );
  return (
    <mesh
      position={[0, 0, 0]}
      geometry={nodes.Body.geometry}
      material={materials.Body}
    ></mesh>
  );
};

const CameraCase = () => {
  const { scene, nodes, materials } = useLoader(
    GLTFLoader,
    '/Camera_Case.gltf'
  );
  return (
    <mesh
      position={[0, 0, 0]}
      geometry={nodes.Case.geometry}
      material={materials.CaseBlue}
    ></mesh>
  );
};

const CameraGroup = ({ children, titleRef, basicInfoRef }) => {
  //   const scroll = useScroll();
  //   const { width, height } = useThree((state) => state.viewport);
  //   const [cameraHead] = useRefs();
  //   useFrame((state, delta) => {
  // const r1 = scroll.range(0 / 3, 3 / 3);
  // const r2 = scroll.range(2 / 3, 1 / 3);
  // cube.current.rotation.y = THREE.MathUtils.damp(
  //   cube.current.rotation.y,
  //   (-Math.PI / 1.45) * r1,
  //   4,
  //   delta
  // );
  // cube.current.position.x = THREE.MathUtils.damp(
  //   cube.current.position.x,
  //   (-width / 7) * r1,
  //   4,
  //   delta
  // );
  // cube.current.scale.x =
  //   cube.current.scale.y =
  //   cube.current.scale.z =
  //     THREE.MathUtils.damp(
  //       cube.current.scale.z,
  //       0.5 + 0.24 * (1 - rsqw(r1)),
  //       4,
  //       delta
  //     );
  //   });
  const [cameraGroup] = useRefs();
  const scroll = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    const range1 = scroll.range(1 / 4, 1 / 4);
    const range2 = scroll.range(3 / 4, 1 / 4);
    cameraGroup.current.position.x = THREE.MathUtils.damp(
      cameraGroup.current.position.x,
      width * 0.3 * range1,
      4,
      delta
    );

    // Horizontal
    cameraGroup.current.rotation.y = THREE.MathUtils.lerp(
      cameraGroup.current.rotation.y,
      (state.mouse.x * Math.PI) / 10,
      0.2
    );

    // Vertical
    cameraGroup.current.rotation.x = THREE.MathUtils.lerp(
      cameraGroup.current.rotation.x,
      (-state.mouse.y * Math.PI) / 15,
      0.2
    );

    titleRef.current.classList.toggle('hide', range1);
    basicInfoRef.current.classList.toggle('show', range2);
  });
  return (
    <>
      <Scroll>
        <group ref={cameraGroup} rotation={[0, -Math.PI * 0.2, 0]}>
          <CameraHead>
            <CameraBody />
            <CameraCase />
          </CameraHead>
        </group>
      </Scroll>
    </>
  );
};

const CameraScene = () => {
  const [title, basicInfo] = useRefs();

  return (
    <SceneContainer>
      <ContentContainer>
        <TitleContainer ref={title}>
          <h1 style={{ fontSize: 28, margin: 0, color: 'white' }}>
            Introducing
          </h1>
          <FadeTitleContainer>
            <h1
              style={{
                fontSize: 180,
                margin: 0,
                color: 'white',
                lineHeight: 1,
              }}
            >
              CCTX
            </h1>
          </FadeTitleContainer>
        </TitleContainer>
        <BasicInfoRef ref={basicInfo}>
          <BasicInfo />
        </BasicInfoRef>
        <Background />
        <BackgroundCircle />
      </ContentContainer>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          {/* <pointLight position={[100, 100, 100]} intensity={2} />
          <hemisphereLight
            color='#ffffff'
            groundColor='#b9b9b9'
            position={[-7, 25, 13]}
            intensity={0.85}
          /> */}
          <Environment preset='dawn' />

          <group position={[0, 0, 0]}>
            <ScrollControls pages={1} damping={10}>
              <CameraGroup titleRef={title} basicInfoRef={basicInfo} />
              <OrbitControls />
            </ScrollControls>
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, -35, 0]}
              opacity={0.25}
              width={100}
              height={100}
              blur={2}
              far={50}
            />
          </group>
        </Suspense>
      </Canvas>
    </SceneContainer>
  );
};

// const Tag = forwardRef(({ head, stat, expl, ...props }, ref) => {
//     return (
//       <Html ref={ref} className="data" center {...props}>
//         <div>{head}</div>
//         <h1>{stat}</h1>
//         <h2>{expl}</h2>
//       </Html>
//     )
//   })

export default CameraScene;
