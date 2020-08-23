import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Register from './components/user/register.js'
import UsersList from "./components/user/users-list";
import CarsList from "./components/car/cars-list";
import Car from "./components/car/car.component";

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
              <a className="nav-item nav-link" href="/users-list">Users list</a>
              <a className="nav-item nav-link" href="/cars-list">Cars list</a>
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
            <Route path="/users-list" component={UsersList}/>
            <Route path="/cars-list" component={CarsList}/>
            <Route path="/cars/:id" component={Car} />
          </div>


        {/* </div> */}
      </Router>
    );
  }
}

export default App;