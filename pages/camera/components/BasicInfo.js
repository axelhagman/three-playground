import React from 'react';
import styled from 'styled-components';

import InfoTextBlock from './InfoTextBlock';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  height: 100%;
  width: 50vw;
  border-radius: 3rem;
`;

const BasicInfo = () => {
  return (
    <Container>
      <h1 style={{ fontSize: '48px', color: 'white' }}>Capture every moment</h1>
      <InfoTextBlock
        title='Lorem'
        text='Lorem ipsum dolor sit amet, adipiscing elit. Maecenas et enim vel odio
        accumsan tincidunt vel eu lorem.'
      />
      <InfoTextBlock
        title='Tincidunt'
        text='Lorem ipsum dolor sit amet. Maecenas et enim vel odio
        accumsan tincidunt vel eu lorem.'
      />
      <InfoTextBlock
        title='Sit'
        text='Lorem ipsum dolor sit amet, adipiscing elit. Maecenas et enim vel odio
        accumsan tincidunt vel eu lorem. Lorem ipsum dolor sit amet, adipiscing elit.'
      />
      <InfoTextBlock
        title='Vel eu'
        text='Lorem ipsum dolor sit amet, adipiscing elit. Maecenas et enim vel odio
        accumsan tincidunt vel eu lorem. Lorem ipsum dolor sit amet, adipiscing elit. Maecenas et enim vel odio
        accumsan tincidunt vel eu lorem.'
      />
    </Container>
  );
};

export default BasicInfo;
