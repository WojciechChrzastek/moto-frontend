import React, {Component} from "react";
import UserDataService from "../../services/UserDataService";
import {Link} from "react-router-dom";
import UserAlertComponent from "../user-alert/UserAlertComponent";

export default class UserComponent extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                username: "",
                email: "",
                password: "",
            }
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }

    onChangeUsername(e) {
        const username = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                username: username
            }
        }));
    }

    onChangeEmail(e) {
        const email = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                email: email
            }
        }));
    }

    onChangePassword(e) {
        const password = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                password: password
            }
        }));
    }

    getUser(id) {
        UserDataService.get(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateUser() {
        UserDataService.update(
            this.state.currentUser.id,
            this.state.currentUser
        )
            .then(response => {
                this.showAlert("success", "User updated!", "You can now check it in the users list.");
            })
            .catch(
                error => {
                    if (error.response.status === 406) {
                        this.showAlert("danger", "User not updated!", "Please fill in all fields.");
                    } else if (error.response.status === 422) {
                        this.showAlert("danger", "User not updated!", "Please provide a valid email.");
                    } else if (error.response.status === 404) {
                        this.showAlert("danger", "User not updated!", "Selected user has not been found.");
                    } else if (error.response.status === 409) {
                        this.showAlert("danger", "User not updated!", "User with this username/email already exists.");
                    } else {
                        this.showAlert("danger", "User not updated!", "Something went wrong.");
                    }
                }
            )
    }

    deleteUser() {
        UserDataService.delete(this.state.currentUser.id)
            .then(response => {
                this.showAlert("success", "User deleted!", "You will not see it in the users list.");
            })
            .catch(
                error => {
                    if (error.response.status === 404) {
                        this.showAlert("danger", "User not deleted!", "Selected user has not been found.");
                    } else {
                        this.showAlert("danger", "User not deleted!", "Something went wrong.");
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

    render() {
        const {currentUser} = this.state;
        return (
            <div className="edit-user-form">
                <h1 className="user-header">User</h1>
                <form className="submit-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            className="form-control"
                            name="username"
                            type="text"
                            required
                            value={currentUser.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            className="form-control"
                            name="email"
                            type="email"
                            required
                            value={currentUser.email}
                            onChange={this.onChangeEmail}/>
                        <small className="form-text text-muted">
                            Please provide a valid email address.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            required
                            value={currentUser.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                </form>
                <button
                    className="btn btn-sm btn-danger mr-3"
                    type="submit"
                    onClick={this.deleteUser}
                >
                    Delete
                </button>
                <button
                    className="btn btn-sm btn-primary"
                    type="submit"
                    onClick={this.updateUser}
                >
                    Update
                </button>
                <Link to="/users-list">
                    <button className="btn btn-sm btn-info float-right">
                        Return to users list
                    </button>
                </Link>
                <UserAlertComponent ref={this.alert}/>
            </div>
        );
    }

}
