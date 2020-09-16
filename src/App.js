import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Auth/Login';
import Register from './Auth/Register';
import Main from './MainPage/Main';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/"component={Login} />
        <Route exact path="/register"component={Register} />
        <Route exact path="/main-page"component={Main} />
      </Switch>
      </Router>
    </div>
  );
}

export default App;
