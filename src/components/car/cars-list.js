import React, { Component } from "react";
import CarDataService from "../../services/car.service";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

export default class CarsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveCars = this.retrieveCars.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCar = this.setActiveCar.bind(this);
    this.removeAllCars = this.removeAllCars.bind(this);
    this.searchCar = this.searchCar.bind(this);

    this.state = {
      cars: [],
      currentCar: null,
      currentIndex: -1,
      searchName: "",
      data: [],
    };
  }

  componentDidMount() {
    this.retrieveCars();
  }

  onChangeSearchName(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
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

  searchCar() {
    CarDataService.findByTitle(this.state.searchTitle)
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
    this.setState({ active: !currentState });
};

  render() {
    const { searchTitle, cars, currentCar, currentIndex } = this.state;

    return (
    <div className="list row">
        <div className="col-md-8">
            <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by brandname"
              value={searchTitle}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchCar}
              >
                Search
              </button>
            </div>
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
                {cars && cars.map((car, key) => (
                <tr key={key} onClick={() => this.setActiveCar(car, key)}>
                    <td>{car.id}</td>
                    <td>{car.brandname}</td>
                    <td>{car.modelname}</td>
                    <td>{car.manufactureyear}</td>
                </tr>
                ))}
                </tbody>
            </Table>

            <button
              className="btn btn-sm btn-danger"
              onClick={this.removeAllCars}
            >
            Remove All Cars
            </button>
        </div>

        <div className="col-md-4">
            {currentCar ? (
            <div>
                <h4>Car</h4>
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
                <Link to={"/cars/" + currentCar.id}>
                <button className="btn btn-sm btn-info">
                Edit
                </button>
                </Link>
            </div>
            ) : (
            <div>
              <br />
              <p>Please click on a Car...</p>
            </div>
            )}
        </div>
    </div>
    );
  }
}