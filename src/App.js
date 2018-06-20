import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import {DASHBOARD, CONFIGURATION, HEADER, LOGIN, CREATE_ACCOUNT} from './utils/Routes'
import {Dashboard, Configuration, Login, CreateAccount} from './screens'
import Header from './components/Header'
import './App.css';

import session from './lib/Session'

class App extends Component {
  logout = (e) => {
    session.logout()
    window.$('#exitModal').modal('toggle')
  }

  render() {
    return (
      <Router>
        <div className="container mb-3">
          <Route exact path={LOGIN} component={Login}/>
          <Route exact path={CREATE_ACCOUNT} component={CreateAccount}/>
          <PrivateRoute path={HEADER} component={Header} />
          <div className="cs-body-margin">
            <PrivateRoute exact path={DASHBOARD} component={Dashboard}/>
            <PrivateRoute exact path={CONFIGURATION} component={Configuration}/>
          </div>
          <ExitModal onClick={this.logout}/>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => session.valid() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: LOGIN, state: { from: props.location }}}/>
    )
  }/>
);

const ExitModal = ({onClick}) => (
  <div className="modal fade" id="exitModal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Salir</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <p>¿Desea salir de la aplicación?</p>
        </div>
        <div className="modal-footer">
          <Link to={LOGIN} className="btn btn-primary" onClick={onClick}>Si</Link>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
        </div>
      </div>
    </div>
  </div>
)

export default App;
