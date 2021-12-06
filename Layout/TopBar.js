import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  width: 100%;
  background-color: rgba(155, 155, 155, 1);
`;

const TopBar = () => {
  return (
    <Container>
      <Link href='/'>
        <a style={{ width: '100%' }}>Home</a>
      </Link>
      <Link href='/cube'>
        <a style={{ width: '100%' }}>Cube</a>
      </Link>
      <Link href='/switch'>
        <a style={{ width: '100%' }}>switch</a>
      </Link>
    </Container>
  );
};

export default TopBar;
