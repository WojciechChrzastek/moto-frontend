import React, {Component} from "react";
import UserDataService from "../../services/user.service";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";

export default class UsersListComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchUsername = this.onChangeSearchUsername.bind(this);
        this.onChangeSearchEmail = this.onChangeSearchEmail.bind(this);
        this.onChangeSearchPassword = this.onChangeSearchPassword.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.removeAllUsers = this.removeAllUsers.bind(this);
        this.searchUsername = this.searchUsername.bind(this);
        this.searchEmail = this.searchEmail.bind(this);
        this.searchPassword = this.searchPassword.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            searchName: ""
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    onChangeSearchUsername(e) {
        const searchTitle = e.target.value;

        this.setState({
            searchTitle: searchTitle
        });
    }

    onChangeSearchEmail(e) {
        const searchEmail = e.target.value;

        this.setState({
            searchEmail: searchEmail
        });
    }

    onChangeSearchPassword(e) {
        const searchPassword = e.target.value;

        this.setState({
            searchPassword: searchPassword
        });
    }

    retrieveUsers() {
        UserDataService.getAll()
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
    }

    setActiveUser(user, index) {
        this.setState({
            currentUser: user,
            currentIndex: index
        });
    }

    removeAllUsers() {
        UserDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchUsername() {
        UserDataService.findByUsername(this.state.searchUsername)
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchEmail() {
        UserDataService.findByEmail(this.state.searchEmail)
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchPassword() {
        UserDataService.findByPassword(this.state.searchPassword)
            .then(response => {
                this.setState({
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {searchUsername, searchEmail, searchPassword, users, currentUser, currentIndex} = this.state;

        return (
            <div className="list row users-list">
                <div className="input-group mb-3 col-md-8">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="search-bar-text">Search by: </span>
                    </div>
                    <select className="custom-select col-md-2" id="search-bar-selector">
                        <option selected>Choose...</option>
                        <option value="1">Username</option>
                        <option value="2">Email</option>
                        <option value="3">Password</option>
                    </select>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type in username"
                        value={searchUsername}
                        onChange={this.onChangeSearchUsername}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={this.searchUsername}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="col-md-8">

                    <h4>Users List</h4>

                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users && users.map((user, index) => (
                            <tr
                                className={(index === currentIndex ? "table-info" : "")}
                                index={index} onClick={() => this.setActiveUser(user, index)}
                            >
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>

                    <button
                        className="btn btn-sm btn-danger"
                        onClick={this.removeAllUsers}
                    >
                        Remove All Users
                    </button>
                </div>

                <div className="col-md-4">
                    {currentUser ? (
                        <div>
                            <h4>Selected User data</h4>
                            <div>
                                <label>
                                    <strong>Username:</strong>
                                </label>{" "}
                                {currentUser.username}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}
                                {currentUser.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Password:</strong>
                                </label>{" "}
                                {currentUser.password}
                            </div>
                            <div>
                                <Link to={"/users/" + currentUser.id}>
                                    <button className="btn btn-sm btn-info mr-3">
                                        Edit
                                    </button>
                                </Link>
                                {/*<Link to={"/users/" + currentUser.id}>*/}
                                {/*<button className="btn btn-sm btn-danger">*/}
                                {/*Delete*/}
                                {/*</button>*/}
                                {/*</Link>*/}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on an User...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}