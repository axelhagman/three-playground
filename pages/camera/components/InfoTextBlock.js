import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Break = styled.div`
  width: 10rem;
  height: 2rem;
  background-color: black;
  margin-bottom: 0.5rem;
`;

const InfoTextBlock = ({ title, text }) => {
  return (
    <Container>
      <Break />
      <h1 style={{ margin: 0 }}>{title}</h1>
      <h3 style={{ margin: 0 }}>{text}</h3>
    </Container>
  );
};

export default InfoTextBlock;
