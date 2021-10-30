import './App.css';
import React, {Component} from 'react';
import Navbar from './components/Navbar';
import QRCode from './components/QRCode';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <QRCode url="google.com"/>
      </React.Fragment>
    );
  }
}

export default App;
