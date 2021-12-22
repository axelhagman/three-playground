import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: relative;
`;

const InfoTextBlock = ({ title, text }) => {
  return (
    <Container>
      <TitleContainer>
        <h1 style={{ margin: 0, zIndex: 1, color: 'white' }}>{title}</h1>
      </TitleContainer>
      <h3 style={{ margin: 0, color: 'white' }}>{text}</h3>
    </Container>
  );
};

export default InfoTextBlock;
