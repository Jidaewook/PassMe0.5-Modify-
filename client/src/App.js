import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './auth/Login';
import Dashboard from './components/Dashboard';
import Store from './store';

import './App.css';


function App() {
  return (
    <Provider store={Store}>
      <Router>
        <div className="App">
          <Nav />
          <Route exact path="/" component={Landing} />
          <div class="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
