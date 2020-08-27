import React, {Component} from "react";
import CarDataService from "../../services/car.service";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";

export default class CarsListComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchBrand = this.onChangeSearchBrand.bind(this);
        this.onChangeSearchModel = this.onChangeSearchModel.bind(this);
        this.retrieveCars = this.retrieveCars.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCar = this.setActiveCar.bind(this);
        this.removeAllCars = this.removeAllCars.bind(this);
        this.searchBrand = this.searchBrand.bind(this);
        this.searchModel = this.searchModel.bind(this);

        this.state = {
            currentCar: null,
            currentIndex: -1,
            searchBrand: "",
            searchModel: "",
            data: []
        };
    }

    componentDidMount() {
        this.retrieveCars();
    }

    onChangeSearchBrand(e) {
        const searchBrand = e.target.value;

        this.setState({
            searchBrand: searchBrand
        });
    }

    onChangeSearchModel(e) {
        const searchModel = e.target.value;

        this.setState({
            searchModel: searchModel
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

    removeAllCars() {
        CarDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchBrand() {
        CarDataService.findByBrand(this.state.searchBrand)
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

    searchModel() {
        CarDataService.findByModel(this.state.searchModel)
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

    toggleClass() {
        const currentState = this.state.active;
        this.setState({active: !currentState});
    };

    render() {
        const {searchBrand, searchModel, cars, currentCar, currentIndex} = this.state;

        return (
            <div className="list row cars-list">
                <div className="input-group mb-3 col-md-8">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="search-bar-text">Search by: </span>
                    </div>
                    <select className="custom-select col-md-2" id="search-bar-selector">
                        {/*<option selected>Choose...</option>*/}
                        <option value="1">Brand</option>
                        {/*<option value="2">Model</option>*/}
                    </select>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type in brand name"
                        value={searchBrand}
                        onChange={this.onChangeSearchBrand}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            onClick={this.searchBrand}
                        >
                            Search
                        </button>
                    </div>
                </div>

                <div className="col-md-8">

                    <h4>Cars List</h4>

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
                            <tr
                                className={(index === currentIndex ? "table-info" : "")}
                                index={index} onClick={() => this.setActiveCar(car, index)}
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
                        onClick={this.removeAllCars}
                    >
                        Remove All Cars
                    </button>
                </div>

                <div className="col-md-4 selected-car">
                    {currentCar ? (
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
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Car...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}