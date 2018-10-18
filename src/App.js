import React, { Component } from 'react';
import {HashRouter as Router, Route, Redirect, Link} from 'react-router-dom'
import {DASHBOARD, CONFIGURATION, HEADER, LOGIN, CREATE_ACCOUNT, SETTINGS, PRESCRIPTION_SUCCESS} from './utils/Routes'
import {Dashboard, Configuration, Login, CreateAccount, Settings, PrescriptionSuccess} from './screens'
import Header from './components/Header'
import Error from './components/Error'
import Battery from './components/Battery'
import './App.css';

import session from './lib/Session'

class App extends Component {
  state = {
    error: ''
  }

  logout = (e) => {
    session.logout()
    window.$('#exitModal').modal('toggle')
  }

  onError = (e) => {
    console.error(e)
    this.setState({error: e.message ? e.message : e})
    window.scrollTo(0, 0)
  }

  clearError = () => this.setState({error: ''})

  render() {
    return (
      <Router>
        <div className="container mb-3">
          <Route exact path={LOGIN} component={Login}/>
          <Route exact path={CREATE_ACCOUNT} component={CreateAccount}/>
          <PrivateRoute path={HEADER} component={Header} />
          <div className="cs-body-margin">
            <PrivateRoute path="/private" component={BatteryPanel} onError={this.onError}/>
            <PrivateRoute path="/private" component={Error} message={this.state.error} onClick={this.clearError}/>
            <PrivateRoute exact path={DASHBOARD} component={Dashboard} onError={this.onError} clearError={this.clearError}/>
            <PrivateRoute exact path={PRESCRIPTION_SUCCESS} component={PrescriptionSuccess}/>
            <PrivateRoute exact path={CONFIGURATION} component={Configuration}  clearError={this.clearError}/>
            <PrivateRoute exact path={SETTINGS} component={Settings}  clearError={this.clearError}/>
          </div>
          <ExitModal onClick={this.logout}/>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => session.valid() ? (
      <Component {...props} {...rest}/>
    ) : (
      <Redirect to={{pathname: LOGIN, state: { from: props.location }}}/>
    )
  }/>
);

const BatteryPanel = ({onError}) => (
  <div className="row mb-3 justify-content-end">
    <div className="col-sm-12">
      <Battery onError={onError} />
    </div>
  </div>
)

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
