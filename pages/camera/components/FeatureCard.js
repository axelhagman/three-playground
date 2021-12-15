import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 1rem;
  background: radial-gradient(
    121.71% 151.1% at 50% 109.39%,
    #24242e 51.56%,
    #c82feb 100%
  );
  width: 15rem;
  outline: 1px solid rgba(255, 255, 255, 0.12);
  outline-offset: -1px;
`;

const FeatureCard = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FeatureCard;
