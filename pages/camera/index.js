import React, { useRef, useState, useEffect, Suspense } from 'react';
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
import { useSpring, animated } from '@react-spring/three';

import BasicInfo from './components/BasicInfo';
import RegularContent from './components/RegularContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const SceneScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 140vh;
  background-color: transparent;
`;

const SceneStickyContainer = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const SceneRelativeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const BackgroundSlides = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #1b1b22;
  z-index: -1;
`;

const BackgroundSlice = styled.div`
  position: absolute;
  width: 40vw;
  height: 120vw;
  right: -10vw;
  background-color: rgba(200, 47, 235, 1);
  box-shadow: -1.5rem 0 2rem rgba(0, 0, 0, 1);
  z-index: -1;
  transition: all ease 1s;
  top: ${({ rotated }) => (rotated ? '-60vh' : '-10vh')};
  transform: ${({ rotated }) => (rotated ? 'rotate(-50deg)' : 'rotate(20deg)')};
`;

const BackgroundSliceDark = styled.div`
  position: absolute;
  width: 35vw;
  height: 120vw;
  right: -20vw;
  transform: rotate(20deg);
  background-color: rgb(155, 17, 186);
  box-shadow: -1rem 0 2rem rgba(0, 0, 0, 0.5);
  z-index: -1;
  transition: all ease 1s;
  top: ${({ rotated }) => (rotated ? '-60vh' : '-10vh')};
  transform: ${({ rotated }) => (rotated ? 'rotate(-50deg)' : 'rotate(20deg)')};
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

const CameraCase = ({ moveCase }) => {
  const { scene, nodes, materials } = useLoader(
    GLTFLoader,
    '/Camera_Case.gltf'
  );
  const { position } = useSpring({
    position: moveCase ? [0, 0, 5] : [0, 0, 0],
  });
  return (
    <animated.mesh
      position={position}
      geometry={nodes.Case.geometry}
      material={materials.CaseBlue}
    ></animated.mesh>
  );
};

const CameraGroup = ({ titleRef, basicInfoRef, scrollPosition }) => {
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
  const [moveCase, setMoveCase] = useState(false);

  const [cameraGroup] = useRefs();
  const { width, height } = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    cameraGroup.current.position.x = THREE.MathUtils.damp(
      cameraGroup.current.position.x,
      THREE.MathUtils.clamp(width * scrollPosition * 0.0015, 0, 2),
      4,
      delta
    );
  });

  useEffect(() => {
    titleRef.current.classList.toggle('hide', scrollPosition > 230);
    basicInfoRef.current.classList.toggle('show', scrollPosition > 230);
  }, [scrollPosition, titleRef, basicInfoRef]);
  return (
    <>
      <group
        ref={cameraGroup}
        onClick={() => setMoveCase(!moveCase)}
        rotation={[0, -Math.PI * 0.2, 0]}
      >
        <CameraHead>
          <CameraBody />
          <CameraCase moveCase={moveCase} />
        </CameraHead>
      </group>
    </>
  );
};

const CameraScene = () => {
  const [title, basicInfo] = useRefs();
  const [rotated, setRotated] = useState(false);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 700) {
      setRotated(true);
    } else {
      setRotated(false);
    }
  }, [scrollPosition]);

  return (
    <Container>
      <SceneScrollContainer>
        <SceneStickyContainer>
          <SceneRelativeContainer>
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
            </ContentContainer>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <Environment preset='dawn' />

                <group position={[0, 0, 0]}>
                  <CameraGroup
                    scrollPosition={scrollPosition}
                    titleRef={title}
                    basicInfoRef={basicInfo}
                  />
                </group>
              </Suspense>
            </Canvas>
          </SceneRelativeContainer>
        </SceneStickyContainer>
      </SceneScrollContainer>
      <RegularContent></RegularContent>
      <BackgroundSlides>
        <BackgroundSlice rotated={rotated} />
        <BackgroundSliceDark rotated={rotated} />
      </BackgroundSlides>
    </Container>
  );
};

export default CameraScene;
