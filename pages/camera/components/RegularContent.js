import React from 'react';
import styled from 'styled-components';

import FeatureCard from './FeatureCard';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
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
  margin-top: 1rem;
`;

const Divider = styled.div`
  min-width: 2rem;
`;

const RegularContent = () => {
  return (
    <Container>
      <Header>
        <h3 style={{ color: 'white', margin: 0, marginBottom: '0.5rem' }}>
          Important features
        </h3>
        <h1 style={{ margin: 0, color: 'white' }}>STUNNING QUALITY</h1>
      </Header>
      <CardsContainer>
        <FeatureCard>
          <h2 style={{ color: 'white', margin: 0 }}>HDR Images</h2>
        </FeatureCard>
        <Divider />
        <FeatureCard>
          <h2 style={{ color: 'white', margin: 0 }}>4K Videos</h2>
        </FeatureCard>
        <Divider />
        <FeatureCard>
          <h2 style={{ color: 'white', margin: 0 }}>50x zoom</h2>
        </FeatureCard>
      </CardsContainer>
    </Container>
  );
};

export default RegularContent;
