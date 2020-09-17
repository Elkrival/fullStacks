import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import Login from './Auth/Login';
import Register from './Auth/Register';
import MemberPage from './MainPage/MemberPage';
import HomePage from './MainPage/HomePage';

function App() {
  return (
    <div className="container-fluid">
      <Router>
      <Switch>
        <Route exact path="/"component={Login} />
        <Route exact path="/register-user" component={Register} />
        <Route exact path="/member-page"component={MemberPage} />
        <Route exact path="/home-page"component={HomePage} />
      </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
