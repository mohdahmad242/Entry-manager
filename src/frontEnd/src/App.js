import React from "react";
import { render } from "react-dom";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";
import Dashboard from "./components/dashboard";
import CheckInForm from "./components/checkInForm";
import HostForm from "./components/hostForm";
import PastEntryDashboard from "./components/pastEntry";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/checkIn" component={CheckInForm} />
          <Route path="/host" component={HostForm} />
          <Route path="/pastEntry" component={PastEntryDashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
