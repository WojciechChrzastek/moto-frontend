import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import RegisterComponent from './components/user/register.component.js'
import User from './components/user/user.component.js'
import UsersListComponent from "./components/user/users-list.component";
import CarsListComponent from "./components/car/cars-list.component";
import Car from "./components/car/car.component";
import AddCarComponent from "./components/car/add-car.component";

export default class App extends Component {
    render() {
        return (
            <Router>

                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand m-auto">MotoApp</a>
                    <div className="navbar-nav m-auto">
                        <a className="nav-item nav-link" href="/register">Register</a>
                        <a className="nav-item nav-link" href="/users-list">Users list</a>
                        <a className="nav-item nav-link" href="/cars-list">Cars list</a>
                        <a className="nav-item nav-link" href="/add-car">Add car</a>
                    </div>
                </nav>

                <div className="container">
                    <Route path="/register" component={RegisterComponent}/>
                    <Route path="/users-list" component={UsersListComponent}/>
                    <Route path="/cars-list" component={CarsListComponent}/>
                    <Route path="/add-car" component={AddCarComponent}/>
                    <Route path="/cars/:id" component={Car}/>
                    <Route path="/users/:id" component={User}/>
                </div>

            </Router>
        );
    }
}
