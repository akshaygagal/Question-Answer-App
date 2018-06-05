import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Navbar from './Navbar.js';
import Home from './Home.js';
import Help from './Help.js';
import Autho from './Autho.js';
import Profile from './Profile.js';
import History from './History.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/help" component={Help} />
          <Route path="/history" component={History} />
          <Route path="/autho" component={Autho} />
          <Route path="/profile" component={Profile} />
        </div>
      </Router>
    );
  }
}

export default App;
