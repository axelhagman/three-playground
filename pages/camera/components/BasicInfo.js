import React from 'react';
import styled from 'styled-components';

import InfoTextBlock from './InfoTextBlock';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem;
  height: 80vh;
  width: 50vw;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 3rem;
`;

const BasicInfo = () => {
  return (
    <Container>
      <h1 style={{ textAlign: 'center', margin: 0, marginBottom: '1rem' }}>
        Secure your area from top to bottom
      </h1>
      <h3 style={{ textAlign: 'center', margin: 0 }}>
        Lorem ipsum dolor sit amet, adipiscing elit. Maecenas et enim vel odio
        accumsan tincidunt vel eu lorem.
      </h3>
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
