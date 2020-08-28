import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import RegisterComponent from './components/user/register.component.js'
import Login from './components/user/login.component.js'
import User from './components/user/user.component.js'
import UsersListComponent from "./components/user/users-list.component";
import CarsListComponent from "./components/car/cars-list.component";
import Car from "./components/car/car.component";
import AddCarComponent from "./components/car/add-car.component";

export default class App extends Component {
    state = {username: "", isAuthenticated: false};

    updateUsername = () => {
        const username = localStorage.getItem("username");
        this.setState({username: username});
        if (username.length > 0) {
            this.setState({isAuthenticated: true});
            console.log("true");
        } else {
            this.setState({isAuthenticated: false});
            console.log("false");
        }
    };

    logout() {
        localStorage.setItem("username", "no logged user");
    }

    render() {
        return (
            <Router>

                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/" className="navbar-brand m-auto">MotoApp</a>
                    <div className="navbar-nav m-auto">
                        <a className="nav-item nav-link" href="/register">Register</a>
                        <a className="nav-item nav-link" href="/login">Login</a>
                        <a className="nav-item nav-link" href="/users-list">Users list</a>
                        <a className="nav-item nav-link" href="/cars-list">Cars list</a>
                        <a className="nav-item nav-link" href="/add-car">Add car</a>
                    </div>
                </nav>

                <div className="container d-flex flex-row-reverse">
                    <span>{localStorage.getItem("username") !== null ?
                        <a href="/login" onClick={this.logout}>Log out</a> : null}</span>
                    <span>&nbsp;</span>
                    <span>Logged user: {localStorage.getItem("username")}</span>
                </div>

                <div className="container">
                    <Route path="/login" render={props => <Login updateUsername={this.updateUsername}/>}/>
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
