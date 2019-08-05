import React from 'react';

import styled from 'styled-components';

const FooterContainer = styled.div`
  margin-top: 64px;
  width: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const LogoImage = styled.img`
  width: 312px;
`;

function Footer() {
  return (
    <FooterContainer>
      <LogoImage src="pe-logo.png" alt="Logo" />
    </FooterContainer>
  );
}

export default Footer;
