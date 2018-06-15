import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import {Dashboard} from './screens'
import Header from './components/Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <div className="cs-body-margin">
            <Route exact path="/" component={Dashboard}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
