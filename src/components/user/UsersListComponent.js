import React, {Component} from "react";
import UserDataService from "../../services/UserDataService";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import UserAlertComponent from "../user-alert/UserAlertComponent";

export default class UsersListComponent extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.onChangeSearchBy = this.onChangeSearchBy.bind(this);
        this.searchBy = this.searchBy.bind(this);
        this.handleSearchByChange = this.handleSearchByChange.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.deleteAllUsers = this.deleteAllUsers.bind(this);

        this.state = {
            data: [],
            currentUser: null,
            currentIndex: -1,
            searchBy: "",
            searchByPlaceholder: "Type in username",
            searchByMethod: "username",
            foundUsers: true
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    onChangeSearchBy(e) {
        const searchBy = e.target.value;

        this.setState({
            searchBy: searchBy
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

    deleteAllUsers() {
        UserDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
                this.showAlert("success", "All users deleted!", "The users list is empty now.");
            })
            .catch(error => {
                    console.log(error);
                    if (error.response.status === 404) {
                        this.showAlert("danger", "Users not deleted!", "Users list is already empty.");
                    } else {
                        this.showAlert("danger", "Users not deleted!", "Something went wrong.");
                    }
                }
            )
    }

    processResponse(response) {
        response
            .then(response => {
                this.setState({
                    foundUsers: true,
                    users: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
                this.setState({foundUsers: false})
                if (e.response.status === 404) {
                    this.showAlert("danger", "Users not found!", "There is no user of given data.");
                } else {
                    this.showAlert("danger", "Users not found!", "Something went wrong.");
                }
            });
    }

    searchBy() {
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
        switch (this.state.searchByMethod) {
            case 'username':
                this.processResponse(UserDataService.findByUsername(this.state.searchBy))
                break;
            case 'email':
                this.processResponse(UserDataService.findByEmail(this.state.searchBy))
                break;
            case 'password':
                this.processResponse(UserDataService.findByPassword(this.state.searchBy))
                break;
            default:
                break;
        }
    }

    handleSearchByChange(event) {
        switch (event.target.value) {
            case "username":
                this.setState({
                    searchByPlaceholder: "Type in username",
                    searchByMethod: "username"
                });
                break;
            case "email":
                this.setState({
                    searchByPlaceholder: "Type in email",
                    searchByMethod: "email"
                });
                break;
            case "password":
                this.setState({
                    searchByPlaceholder: "Type in password",
                    searchByMethod: "password"
                });
                break;
            default :
                break;
        }
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    }

    showAlert(variant, heading, message) {
        console.log(message);
        this.alert.current.setVisible(true);
        this.alert.current.setVariant(variant);
        this.alert.current.setHeading(heading);
        this.alert.current.setMessage(message);
    }

    render() {
        const {searchByPlaceholder, users, currentUser, currentIndex} = this.state;

        return (
            <div className="list row users-list">
                <div className="input-group mb-3 col-md-8">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="search-bar-text">Search by: </span>
                    </div>
                    <select className="custom-select col-md-2" id="search-bar-selector"
                            value={this.state.value} onChange={this.handleSearchByChange}>
                        <option value="username">Username</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                    </select>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={searchByPlaceholder}
                        onChange={this.onChangeSearchBy}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={this.searchBy}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="col-md-8">
                    <h4>Users List</h4>
                    {this.state.foundUsers === true ?
                        (
                            <div>
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
                                        <tr key={user.id}
                                            className={(index === currentIndex ? "table-info" : null)}
                                            onClick={() => this.setActiveUser(user, index)}
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
                                    className="btn btn-sm btn-danger rmv-all-btn"
                                    onClick={this.deleteAllUsers}
                                >
                                    Remove All Users
                                </button>
                            </div>

                        ) : <UserAlertComponent ref={this.alert}/>
                    }
                    <UserAlertComponent ref={this.alert}/>
                </div>

                <div className="col-md-4 selected-user">
                    {currentUser ?
                        (
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
                        ) :
                        (
                            this.state.foundUsers === true ?
                                <div>
                                    <br/>
                                    <p>Please click on an User...</p>
                                </div>
                                :
                                null
                        )
                    }
                </div>
            </div>
        );
    }

}
