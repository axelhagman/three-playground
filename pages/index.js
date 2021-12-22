import React, {
  useRef,
  useState,
  useEffect,
  Suspense,
  useCallback,
} from 'react';
import Head from 'next/head';
import styled from 'styled-components';

import RegularContent from './components/RegularContent';
import HeroContent from './components/HeroContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const BackgroundCircles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #1b1b22;
  z-index: -1;
`;

const BackgroundCircle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80vh;
  height: 80vh;
  position: absolute;
  right: ${({ hide }) => (hide ? '-100vh' : '-40vh')};
  opacity: ${({ hide }) => (hide ? '0' : '1')};
  top: 10vh;
  transition: all ease 1.5s;
  border-radius: 100%;
  background-image: linear-gradient(135deg, #c82feb 10.57%, #25ceec 100%);
`;

const BackgroundInnerCircle = styled.div`
  width: 80%;
  height: 80%;
  background: #1b1b22;
  border-radius: 50%;
`;

const BackgroundCircleDark = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40vh;
  height: 40vh;
  position: absolute;
  left: ${({ hide }) => (hide ? '-50vh' : '-20vh')};
  opacity: ${({ hide }) => (hide ? '0' : '1')};
  transition: all ease 1.5s;
  bottom: -10vh;
  border-radius: 50%;
  border: 70px solid #282833;
`;

const CameraPage = () => {
  const [hideCircles, setHideCircles] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    height: 0,
    width: 0,
  });
  const [documentDimensions, setDocumentDimensions] = useState(0);

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setWindowDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    setDocumentDimensions({
      height: document.documentElement.clientHeight,
      width: document.documentElement.clientWidth,
    });
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 520) {
      setHideCircles(true);
    } else {
      setHideCircles(false);
    }
    if (window.visualViewport.height) console.log(scrollPosition);
  }, [scrollPosition]);

  return (
    <>
      <Head>
        <title>ThreeJS Playground</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <HeroContent scrollPosition={scrollPosition} />
        <RegularContent
          windowDimensions={windowDimensions}
          documentDimensions={documentDimensions}
        ></RegularContent>
        <BackgroundCircles>
          {/* <BackgroundSlice rotated={rotated} />
          <BackgroundSliceDark rotated={rotated} /> */}
          <BackgroundCircle hide={hideCircles}>
            <BackgroundInnerCircle />
          </BackgroundCircle>
          <BackgroundCircleDark hide={hideCircles} />
        </BackgroundCircles>
      </Container>
    </>
  );
};

export default CameraPage;
