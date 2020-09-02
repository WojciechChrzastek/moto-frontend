import React, {Component} from 'react';
import UserDataService from "../../services/UserDataService";

import '../../styles/style.css';

import UserAlertComponent from '../user-alert/UserAlertComponent.js';

export default class RegisterComponent extends Component {

    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            username: "",
            password: "",
            email: "",
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    saveUser() {
        const data = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        };

        UserDataService.add(data)
            .then(response => {
                this.showAlert("success", "User registered!", "You can now log in using your credentials.");
                this.setState({
                    id: response.data.id,
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                });
                this.newUser();
            })
            .catch(
                error => {
                    if (error.response.status === 409) {
                        this.showAlert("danger", "User not registered!", "User with this username/email already exists.");
                    } else if (error.response.status === 406) {
                        this.showAlert("danger", "User not registered!", "Please fill in all fields.");
                    } else {
                        this.showAlert("danger", "User not registered!", "Something went wrong.");
                    }
                }
            )
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    showAlert(variant, heading, message) {
        console.log(message);
        this.alert.current.setVisible(true);
        this.alert.current.setVariant(variant);
        this.alert.current.setHeading(heading);
        this.alert.current.setMessage(message);
    }

    newUser() {
        this.setState({
            id: null,
            username: "",
            password: "",
            email: "",
        });
    }

    render() {
        return (
            <div className="Register">
                <h1 className="RegisterHeader">Register</h1>
                <form className="submit-form" onSubmit={this.handleSubmit}>

                    <div className="form-group" id="username">
                        <label htmlFor="username">Username</label>
                        <input
                            className="form-control"
                            name="username"
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            autoFocus
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}/>
                    </div>

                    <div className="form-group" id="password">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}/>
                    </div>

                    <div className="form-group" id="email">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}/>
                        <small className="form-text text-muted">
                            Please provide a valid email address.
                        </small>
                    </div>

                    <button
                        onClick={this.saveUser}
                        className="btn btn-primary"
                        type="submit"
                    >Register
                    </button>
                </form>
                <UserAlertComponent ref={this.alert}/>
            </div>
        );
    }

}