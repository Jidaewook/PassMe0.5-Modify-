import React from 'react';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Navbar';
import Landing from './components/layout/Landing';

import './App.css';


function App() {
  return (
    <div className="App">
      <Nav />
      <Landing />
     
      <Footer />
    </div>
  );
}

export default App;
