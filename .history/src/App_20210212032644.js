import React, { Component } from "react";
//import db from "./firebase";
import {Route,BrowserRouter as Router, Switch} from "react-router-dom";
import Listing from "./Pages/Lists";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";
import JobPage from "./Pages/JobPage";
import ForgotPassword from "./Pages/ForgotPassword";
import { AuthProvider } from "./contexts/AuthContext"
class App extends Component{
  
  render() {
    return (
      <AuthProvider>
        <Router>
          <div className="App">
          
            <Switch>
              <Route exact path="/" component={Listing} />
              <Route path="/SignUp" component={SignUp} />
              <Route path="/LogIn" component={LogIn} />
              <Route path="/DashBoard" component={Listing} />
              <Route path="/JobPage/:docId" component={JobPage} />
              <Route path="/ForgotPassword" component={ForgotPassword} />
            </Switch>
          </div>
        </Router>
      </AuthProvider>
    )
  }
}

export default App;
