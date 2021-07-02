import React, { Component } from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";

import LandingPage from "./dashboard/landingPage";
import Dashboard from "./dashboard/dashboard";

class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
    );
  }
}


export default App;
