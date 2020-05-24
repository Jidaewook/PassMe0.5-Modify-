import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './auth/Login';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Route exact path="/" component={Landing} />
        <div class="container">
          <Route exact path="/login" component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
