import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import {DASHBOARD, CONFIGURATION, HEADER} from './utils/Routes'
import {Dashboard, Configuration} from './screens'
import Header from './components/Header'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container mb-3">
          <Route path={HEADER} component={Header} />
          <div className="cs-body-margin">
            <Route exact path={DASHBOARD} component={Dashboard}/>
            <Route exact path={CONFIGURATION} component={Configuration}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
