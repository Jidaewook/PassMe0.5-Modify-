import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import App from './App';
import Activate from './screens/Activate';
import ResetPassword from './screens/ResetPassword';

import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/' exact render={props => <App {...props}  />}  />
      <Route path='/users/activate/:token' exact render={props => <Activate {...props}  />}  />
      <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} /> } />
      <Redirect to='/' />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


