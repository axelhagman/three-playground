import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border-radius: 1rem;
  background-color: gray;
`;

const FeatureCard = ({ children }) => {
  return <Container>{children}</Container>;
};

export default FeatureCard;
