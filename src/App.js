import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import QRCode from './components/QRCode';

function App() {
  return (
    <>
      <Navbar />
      <QRCode url="google.com"/>
    </>
  );
}

export default App;
