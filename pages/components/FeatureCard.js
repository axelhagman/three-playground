import React from 'react';
import styled from 'styled-components';

import Image from 'next/image';

const COPY = {
  video: {
    header: '4K Video',
    subHeader: 'Record at 60 frames per second',
    image: '/denise-schuld-DDCdJftUpD4-unsplash.jpg',
  },
  hdr: {
    header: 'HDR Images',
    subHeader: 'Proffessional quality',
    image: '/andrew-svk-cNoorc8uDyI-unsplash.jpg',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-width: 440px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 246px;
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
`;

const CopyContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 1.5rem;
`;

const FeatureCard = ({ variant }) => {
  if (!variant) {
    return null;
  }
  return (
    <Container>
      <ImageContainer>
        <Image
          src={COPY[variant].image}
          alt=''
          layout='fill'
          objectFit='cover'
        />
      </ImageContainer>
      <CopyContainer>
        <h1 style={{ color: 'white', margin: 0 }}>{COPY[variant].header}</h1>
        <h3 style={{ color: 'white', margin: 0 }}>{COPY[variant].subHeader}</h3>
      </CopyContainer>
    </Container>
  );
};

export default FeatureCard;
