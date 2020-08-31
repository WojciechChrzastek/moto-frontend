import React, {Component} from "react";
import UserDataService from "../../services/UserDataService";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import UserAlertComponent from "../../UserAlertComponent";

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
        this.removeAllUsers = this.removeAllUsers.bind(this);

        this.state = {
            data: [],
            currentUser: null,
            currentIndex: -1,
            searchBy: "",
            searchByPlaceholder: "Type in username",
            foundUsers: 1
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

    removeAllUsers() {
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

    searchBy() {
        this.setState({foundUsers: 1})
        this.setState({
            currentUser: null,
            currentIndex: -1
        });
        this.state.searchByPlaceholder === "Type in username"
            ? UserDataService.findByUsername(this.state.searchBy)
                .then(response => {
                    this.setState({
                        users: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    this.setState({foundUsers: 0})
                    if (e.response.status === 404) {
                        this.showAlert("danger", "Users not found!", "There is no user of given data.");
                    } else {
                        this.showAlert("danger", "Users not found!", "Something went wrong.");
                    }
                })
            : UserDataService.findByEmail(this.state.searchBy)
                .then(response => {
                    this.setState({
                        users: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    this.setState({foundUsers: 0})
                    if (e.response.status === 404) {
                        this.showAlert("danger", "Users not found!", "There is no user of given data.");
                    } else {
                        this.showAlert("danger", "Users not found!", "Something went wrong.");
                    }
                });

        // : UserDataService.findByPassword(this.state.searchBy)
        //     .then(response => {
        //         this.setState({
        //             users: response.data
        //         });
        //         console.log(response.data);
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         this.setState({foundUsers: 0})
        //         if (e.response.status === 404) {
        //             this.showAlert("danger", "Users not found!", "There is no user of given data.");
        //         } else {
        //             this.showAlert("danger", "Users not found!", "Something went wrong.");
        //         }
        //     });

    }

    handleSearchByChange(event) {
        this.setState({searchByPlaceholder: event.target.value});
    }

    toggleClass() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    }

    showAlert(variant, heading, message) {
        console.log(message);
        this.alert.current.setVariant(variant);
        this.alert.current.setHeading(heading);
        this.alert.current.setMessage(message);
        this.alert.current.setVisible(true);
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
                        <option value="Type in username">Username</option>
                        <option value="Type in email">Email</option>
                        {/*<option value="3">Password</option>*/}
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
                    {this.state.foundUsers === 1 ?
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
                                            className={(index === currentIndex ? "table-info" : "")}
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
                                    onClick={this.removeAllUsers}
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
                            this.state.foundUsers === 1 ?
                                <div>
                                    <br/>
                                    <p>Please click on an User...</p>
                                </div>
                                :
                                ""
                        )
                    }
                </div>
            </div>
        );
    }
}
