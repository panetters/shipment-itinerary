import React from 'react';

import GlobalStyle from '../library/global';
import Toast from '../components/Toast';
import Header from '../components/Header';
import IntineraryForm from '../components/ItineraryForm';
import ItineraryList from '../components/ItineraryList';
import Footer from '../components/Footer';

function App() {
  return (
    <>
      <GlobalStyle />
      <Toast />
      <Header />
      <IntineraryForm />
      <ItineraryList />
      <Footer />
    </>
  );
}

export default App;
