import React, {Component} from "react";
import UserDataService from "../../services/user.service";
import {Link} from "react-router-dom";
import UserAlert from "../../user-alert";

export default class User extends Component {
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
                        this.showAlert("danger", "Insufficient data.", "Please fill in all fields.");
                    } else if (error.response.status === 422) {
                        this.showAlert("danger", "Invalid email format.", "Please provide a valid email.");
                    } else if (error.response.status === 404) {
                        this.showAlert("danger", "User not updated!", "There is no user of given ID.");
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
                        this.showAlert("danger", "User not deleted!", "There is no user of given ID.");
                    } else {
                        this.showAlert("danger", "User not deleted!", "Something went wrong.");
                    }
                }
            )
    }

    showAlert(variant, heading, message) {
        console.log(message);
        this.alert.current.setVariant(variant);
        this.alert.current.setHeading(heading);
        this.alert.current.setMessage(message);
        this.alert.current.setVisible(true);
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div className="edit-user-form">
                <h1 className="UserHeader">Car</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="brand">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={currentUser.username}
                            onChange={this.onChangeUsername}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={currentUser.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="password"
                            value={currentUser.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                </form>

                <button
                    className="btn btn-sm btn-danger mr-3"
                    onClick={this.deleteUser}
                >
                    Delete
                </button>

                <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    onClick={this.updateUser}
                >
                    Update
                </button>

                <Link to="/users-list">
                    <button className="btn btn-sm btn-info float-right">
                        Return to users list
                    </button>
                </Link>

                <UserAlert ref={this.alert}/>

            </div>
        );
    }
}