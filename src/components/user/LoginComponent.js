import React, {Component} from 'react';
import '../../styles/style.css';
import UserAlertComponent from '../../UserAlertComponent.js';
import UserDataService from "../../services/UserDataService";

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.logUser = this.logUser.bind(this);

        this.state = {
            username: "",
            password: "",
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

    logUser() {
        const data = {
            username: this.state.username,
            password: this.state.password
        };

        UserDataService.login(data)
            .then(response => {
                console.log(response.data);
                this.showAlert("success", "Login successful!", "You are now logged in.");
                localStorage.setItem("username", this.state.username);
                this.props.updateUsername();
            })
            .catch(
                error => {
                    if (error.response.status === 401) {
                        this.showAlert("danger", "Wrong credentials", "Username and/or password is wrong.");
                    } else if (error.response.status === 406) {
                        this.showAlert("danger", "Insufficient data.", "Please fill in all fields.");
                    } else {
                        this.showAlert("danger", "Login unsuccessful!", "Something went wrong.");
                    }
                }
            )
    }

    handleSubmit = event => {
        event.preventDefault();
    }

    showAlert(variant, heading, message) {
        console.log(message);
        this.alert.current.setVariant(variant);
        this.alert.current.setHeading(heading);
        this.alert.current.setMessage(message);
        this.alert.current.setVisible(true);
    }

    render() {
        return (
            <div className="Login">
                <h1 className="LoginHeader">Login</h1>
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

                    <button
                        onClick={this.logUser}
                        className="btn btn-primary"
                        type="submit"
                    >Login
                    </button>
                </form>
                <UserAlertComponent ref={this.alert}/>
            </div>
        );
    }

}
