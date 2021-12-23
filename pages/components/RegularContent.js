import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import FeatureCard from './FeatureCard';
import PlasticMaterial from './MaterialLayers/PlasticMaterial';
import ColorMaterial from './MaterialLayers/ColorMaterial';
import ClipPath from './MaterialLayers/ClipPath';
import MetalMaterial from './MaterialLayers/MetalMaterial';

const RelativeContainer = styled.div`
  position: relative;
`;

const AbsoluteContainer = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
  z-index: 1;
  margin-top: 5rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

const Divider = styled.div`
  min-width: 2rem;
`;

const ContentDivider = styled.div`
  min-height: 8rem;
`;

const BackgroundSliceContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
`;

const MaterialsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4rem;
`;

const MaterialIconContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 400px;
  height: 250px;
`;

const MaterialSlice = styled.div`
  position: absolute;
  ${({ top }) => (top ? `top: ${top}px;` : 'top: 0;')}
`;

const bounceAnim = ({ y }) => keyframes`
  0% {
    transform: translateY(${-y}px);
  }
  50% {
    transform: translateY(${y}px);
  }
  100% {
    transform: translateY(${-y}px);
  }
`;

const BounceContainer = styled.div`
  animation: ${({ animY }) => (animY ? bounceAnim({ y: animY }) : '')} 5s
    ease-in-out infinite;
  animation-delay: ${({ animOffset }) =>
    animOffset ? `${animOffset}s` : '0s'};
`;

const BlurContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 33px;
`;

const isInViewport = (el, windowDimensions, documentDimensions) => {
  if (el?.current) {
    const rect = el.current.getBoundingClientRect();
    return (
      rect.left >= 0 &&
      rect.top + rect.height / 2 <=
        (windowDimensions.height || documentDimensions.height) &&
      rect.right <= (windowDimensions.width || documentDimensions.width)
    );
  }
  return false;
};

const RegularContent = ({ windowDimensions, documentDimensions }) => {
  const [materialsAnimate, setMaterialsAnimate] = useState(false);
  const ref = useRef();
  const clipRef = useRef();

  useEffect(() => {
    if (ref) {
      setMaterialsAnimate(
        isInViewport(ref, windowDimensions, documentDimensions)
      );
    }
  }, [windowDimensions, documentDimensions, ref]);

  return (
    <RelativeContainer>
      <BackgroundSliceContainer>
        <svg
          width='100%'
          height='2138'
          viewBox='0 0 100 200'
          preserveAspectRatio='none'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M0 0 L 100 50 V 200 L 0 150 V0Z' fill='#282833' />
        </svg>
      </BackgroundSliceContainer>
      <AbsoluteContainer>
        <Container>
          <Header>
            <h1 style={{ margin: 0, color: 'white' }}>Stunning Quality.</h1>
          </Header>
          <CardsContainer>
            <FeatureCard variant='hdr' />
            <Divider />
            <FeatureCard variant='video' />
          </CardsContainer>
          <ContentDivider />
          <Header>
            <h1 style={{ margin: 0, color: 'white' }}>
              High Quality Materials.
            </h1>
          </Header>
          <MaterialsContainer>
            <MaterialIconContainer ref={ref}>
              <MaterialSlice
                top={90}
                style={{
                  transform: materialsAnimate
                    ? 'translateY(0px)'
                    : 'translateY(250px)',
                  transition: 'all ease 1s 0.5s',
                }}
              >
                <BounceContainer animY={5} animOffset={2.5}>
                  <MetalMaterial />
                </BounceContainer>
              </MaterialSlice>
              <MaterialSlice
                top={42}
                style={{
                  transform: materialsAnimate
                    ? 'translateY(0px)'
                    : 'translateY(250px)',
                  transition: 'all ease 1s 0.25s',
                }}
              >
                <BounceContainer animY={5} animOffset={1.5}>
                  <ColorMaterial />
                </BounceContainer>
              </MaterialSlice>
              <BlurContainer
                style={{
                  transform: materialsAnimate
                    ? 'translateY(0px)'
                    : 'translateY(250px)',
                  transition: 'all ease 1s 0s',
                  clipPath: clipRef ? 'url(#myClip)' : '',
                  backdropFilter: clipRef ? 'blur(5px)' : '',
                }}
              />
              <MaterialSlice
                style={{
                  transform: materialsAnimate
                    ? 'translateY(0px)'
                    : 'translateY(250px)',
                  transition: 'all ease 1s 0s',
                }}
              >
                <BounceContainer animY={5} animOffset={0}>
                  <PlasticMaterial />
                </BounceContainer>
              </MaterialSlice>
              <MaterialSlice ref={clipRef}>
                <ClipPath />
              </MaterialSlice>
              {/* <MaterialSlice>
                <Materials animate={materialsAnimate} />
              </MaterialSlice> */}
              {/* <MaterialSlice top={300}>
                <Test />
              </MaterialSlice> */}
            </MaterialIconContainer>
            <h3 style={{ margin: 0, color: 'white' }}>
              To ensure that you get a long lasting product our cases are made
              from recycled plastic that has been melted down and molded in a
              high pressure forge. During this process they are dyed in a
              environmentally friendly paint. This means the color of the cases
              are not just a layer of paint that could be scratched off but
              rather the plasic itself.{' '}
            </h3>
          </MaterialsContainer>
        </Container>
      </AbsoluteContainer>
    </RelativeContainer>
  );
};

export default RegularContent;
