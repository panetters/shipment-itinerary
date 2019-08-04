import React from 'react';

import { createGlobalStyle } from 'styled-components';
import * as colors from '../library/colors';

import Toast from '../components/Toast';
import IntineraryForm from '../components/ItineraryForm';
import ItineraryList from '../components/ItineraryList';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${colors.background};
    color: ${colors.textMain};
    font-family: 'Roboto';
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Toast />
      <IntineraryForm />
      <ItineraryList />
    </>
  );
}

export default App;
