import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  position: relative;
`;

const Line = styled.div`
  width: 100%;
  height: 1.2rem;
  background-color: #e66465;
  margin-bottom: 0.5rem;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const InfoTextBlock = ({ title, text }) => {
  return (
    <Container>
      <TitleContainer>
        <Line />
        <h1 style={{ margin: 0, zIndex: 1 }}>{title}</h1>
      </TitleContainer>
      <h3 style={{ margin: 0 }}>{text}</h3>
    </Container>
  );
};

export default InfoTextBlock;
