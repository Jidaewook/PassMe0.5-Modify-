import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import Footer from './components/layout/Footer';
import Nav from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './auth/Login';
import Dashboard from './components/Dashboard';
import Store from './store';

import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './components/actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  Store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
      // Logged out user
      Store.dispatch(logoutUser());

      // Clear current Propfile
      // store.dispatch(clearCurrentProfile());

      // Redirect to login
      window.location.href = '/login'
  }

};


export default class App extends Component {
  render(){
    return (
      <Provider store={Store}>
        <Router>
          <div className="App">
            <Nav />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

