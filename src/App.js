import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Register from './components/user/register.js'

class App extends Component {
  render() {
    return (
      <Router>
        {/* <div> */}
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/" className="navbar-brand m-auto">MotoApp</a>
            <div className="navbar-nav m-auto">
              {/* <li className="nav-item">
                <Link to={"/tutorials"} className="nav-link">
                  Tutorials
                </Link>
              </li> */}
              <a className="nav-item nav-link" href="/register">Register</a>
            </div>
          </nav>

          {/* <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
              <Route exact path="/add" component={AddTutorial} />
              <Route path="/tutorials/:id" component={Tutorial} />
            </Switch>
          </div> */}

          <div className="container">
            <Route path="/register" component={Register}/>
          </div>


        {/* </div> */}
      </Router>
    );
  }
}

export default App;