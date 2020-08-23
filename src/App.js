import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import RegisterComponent from './components/user/register.component.js'
import UsersListComponent from "./components/user/users-list.component";
import CarsListComponent from "./components/car/cars-list.component";
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
            <Route path="/register" component={RegisterComponent}/>
            <Route path="/users-list" component={UsersListComponent}/>
            <Route path="/cars-list" component={CarsListComponent}/>
            <Route path="/cars/:id" component={Car} />
          </div>


        {/* </div> */}
      </Router>
    );
  }
}

export default App;