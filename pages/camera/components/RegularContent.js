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
`;

const RegularContent = () => {
  return (
    <Container>
      <Header>
        <h3>Important features</h3>
        <h1 style={{ margin: 0 }}>STUNNING QUALITY</h1>
      </Header>
      <CardsContainer>
        <FeatureCard>
          <h2>HDR Images</h2>
        </FeatureCard>
        <FeatureCard>
          <h2>4K Videos</h2>
        </FeatureCard>
        <FeatureCard>
          <h2>50x zoom</h2>
        </FeatureCard>
      </CardsContainer>
    </Container>
  );
};

export default RegularContent;
