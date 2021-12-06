import React from 'react';
import styled from 'styled-components';

import TopBar from './TopBar';

const AppContainer = styled.div`
  display: flex;
`;

const ContentWrapper = styled.div`
  width: 100%;
  background-color: white;
  height: 100vh;
`;

const Layout = ({ children }) => {
  return (
    <AppContainer>
      <ContentWrapper>
        <TopBar />
        {children}
      </ContentWrapper>
    </AppContainer>
  );
};

export default Layout;
