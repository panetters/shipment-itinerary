import React from 'react';

import styled from 'styled-components';
import { SmallText } from '../library/typography';

const FooterContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 96px;
  justify-content: space-evenly;
  align-items: center;
`;

const LogoImage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url('pe-logo.png');
  background-position: 50% 50%;
  background-size: 90%;
  background-repeat: no-repeat;
  z-index: -1;
  opacity: 0.05;
`;

function Footer() {
  return (
    <FooterContainer>
      <SmallText>Itinerizer™ Michael Panetta 2019</SmallText>
      <span style={{ fontSize: '10px' }} role="img" aria-label="Fire">
        🔥
      </span>
      <SmallText>
        <a href="mailto:mtpanetta@gmail.com?subject=Sup">Send Me an Email</a>
      </SmallText>
      <span style={{ fontSize: '10px' }} role="img" aria-label="Fire">
        🔥
      </span>
      <SmallText>
        <a href="https://github.com/panetters/shipment-itinerary">GitHub</a>
      </SmallText>
      <LogoImage />
    </FooterContainer>
  );
}

export default Footer;
