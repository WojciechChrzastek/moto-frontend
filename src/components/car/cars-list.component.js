import React, {Component} from "react";
import CarDataService from "../../services/car.service";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import UserAlert from "../../user-alert";

export default class CarsListComponent extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.onChangeSearchBy = this.onChangeSearchBy.bind(this);
        this.retrieveCars = this.retrieveCars.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCar = this.setActiveCar.bind(this);
        this.deleteAllCars = this.deleteAllCars.bind(this);
        this.searchBy = this.searchBy.bind(this);
        this.handleSearchByChange = this.handleSearchByChange.bind(this);

        this.state = {
            currentCar: null,
            currentIndex: -1,
            searchBy: "",
            data: [],
            searchByPlaceholder: "Type in brand name",
            foundCars: 1
        };
    }

    componentDidMount() {
        this.retrieveCars();
    }

    onChangeSearchBy(e) {
        const searchBy = e.target.value;

        this.setState({
            searchBy: searchBy
        });
    }

    retrieveCars() {
        CarDataService.getAll()
            .then(response => {
                this.setState({
                    cars: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveCars();
        this.setState({
            currentCar: null,
            currentIndex: -1
        });
    }

    setActiveCar(car, index) {
        this.setState({
            currentCar: car,
            currentIndex: index
        });
    }

    deleteAllCars() {
        CarDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
                this.showAlert("success", "All cars deleted!", "The cars list is empty now.");
            })
            .catch(error => {
                    console.log(error);
                    if (error.response.status === 404) {
                        this.showAlert("danger", "Cars not deleted!", "Cars list is already empty.");
                    } else {
                        this.showAlert("danger", "Cars not deleted!", "Something went wrong.");
                    }
                }
            )
    }

    searchBy() {
        this.setState({foundCars: 1})
        this.setState({
            currentCar: null,
            currentIndex: -1
        });
        this.state.searchByPlaceholder === "Type in brand name"
            ? CarDataService.findByBrand(this.state.searchBy)
                .then(response => {
                    this.setState({
                        cars: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    this.setState({foundCars: 0})
                    if (e.response.status === 404) {
                        this.showAlert("danger", "Cars not found!", "There is no car of given data.");
                    } else {
                        this.showAlert("danger", "Cars not found!", "Something went wrong.");
                    }
                })
            : CarDataService.findByModel(this.state.searchBy)
                .then(response => {
                    this.setState({
                        cars: response.data
                    });
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                    this.setState({foundCars: 0})
                    if (e.response.status === 404) {
                        this.showAlert("danger", "Cars not found!", "There is no car of given data.");
                    } else {
                        this.showAlert("danger", "Cars not found!", "Something went wrong.");
                    }
                });
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

    handleSearchByChange(event) {
        this.setState({searchByPlaceholder: event.target.value});
    }

    render() {
        const {searchByPlaceholder, cars, currentCar, currentIndex} = this.state;

        return (
            <div className="list row cars-list">
                <div className="input-group mb-3 col-md-8">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="search-bar-text">Search by: </span>
                    </div>
                    <select className="custom-select col-md-2" id="search-bar-selector"
                            value={this.state.value} onChange={this.handleSearchByChange}>
                        <option value="Type in brand name">Brand</option>
                        <option value="Type in model name">Model</option>
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
                    <h4>Cars List</h4>
                    {this.state.foundCars === 1 ?
                        (
                            <div>
                                <Table bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Brand</th>
                                        <th>Model</th>
                                        <th>Year</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cars && cars.map((car, index) => (
                                        <tr key={car.id}
                                            className={(index === currentIndex ? "table-info" : "")}
                                            onClick={() => this.setActiveCar(car, index)}
                                        >
                                            <td>{car.id}</td>
                                            <td>{car.brandname}</td>
                                            <td>{car.modelname}</td>
                                            <td>{car.manufactureyear}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                                <button
                                    className="btn btn-sm btn-danger rmv-all-btn"
                                    onClick={this.deleteAllCars}
                                >
                                    Remove All Cars
                                </button>
                            </div>
                        ) : <UserAlert ref={this.alert}/>
                    }
                    <UserAlert ref={this.alert}/>
                </div>

                <div className="col-md-4 selected-car">
                    {currentCar ?
                        (
                            <div>
                                <h4>Selected Car data</h4>
                                <div>
                                    <label>
                                        <strong>Brand:</strong>
                                    </label>{" "}
                                    {currentCar.brandname}
                                </div>
                                <div>
                                    <label>
                                        <strong>Model:</strong>
                                    </label>{" "}
                                    {currentCar.modelname}
                                </div>
                                <div>
                                    <label>
                                        <strong>Year:</strong>
                                    </label>{" "}
                                    {currentCar.manufactureyear}
                                </div>
                                <div>
                                    <Link to={"/cars/" + currentCar.id}>
                                        <button className="btn btn-sm btn-info mr-3">
                                            Edit
                                        </button>
                                    </Link>
                                    {/*<Link to={"/cars/" + currentCar.id}>*/}
                                    {/*<button className="btn btn-sm btn-danger">*/}
                                    {/*Delete*/}
                                    {/*</button>*/}
                                    {/*</Link>*/}
                                </div>
                            </div>
                        ) :
                        (
                            this.state.foundCars === 1 ?
                                <div>
                                    <br/>
                                    <p>Please click on a Car...</p>
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
