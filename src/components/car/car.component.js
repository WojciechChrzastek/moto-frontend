import React, {Component} from "react";
import CarDataService from "../../services/car.service";
import {Link} from "react-router-dom";

export default class Car extends Component {
    constructor(props) {
        super(props);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.getCar = this.getCar.bind(this);
        this.updateCar = this.updateCar.bind(this);
        this.deleteCar = this.deleteCar.bind(this);

        this.state = {
            currentCar: {
                id: null,
                brandname: "",
                modelname: "",
                manufactureyear: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getCar(this.props.match.params.id);
    }

    onChangeBrand(e) {
        const brand = e.target.value;

        this.setState(prevState => ({
            currentCar: {
                ...prevState.currentCar,
                brandname: brand
            }
        }));
    }

    onChangeModel(e) {
        const model = e.target.value;

        this.setState(prevState => ({
            currentCar: {
                ...prevState.currentCar,
                modelname: model
            }
        }));
    }

    onChangeYear(e) {
        const year = e.target.value;

        this.setState(prevState => ({
            currentCar: {
                ...prevState.currentCar,
                manufactureyear: year
            }
        }));
    }

    getCar(id) {
        CarDataService.get(id)
            .then(response => {
                this.setState({
                    currentCar: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateCar() {
        CarDataService.update(
            this.state.currentCar.id,
            this.state.currentCar
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The car was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteCar() {
        CarDataService.delete(this.state.currentCar.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The car was deleted successfully!"
                });
                // this.props.history.push('/cars-list')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentCar} = this.state;

        return (
            <div className="edit-car-form">
                <h1 className="CarHeader">Car</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={currentCar.brandname}
                            onChange={this.onChangeBrand}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Model</label>
                        <input
                            type="text"
                            className="form-control"
                            id="model"
                            value={currentCar.modelname}
                            onChange={this.onChangeModel}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Year</label>
                        <input
                            type="text"
                            className="form-control"
                            id="year"
                            value={currentCar.manufactureyear}
                            onChange={this.onChangeYear}
                        />
                    </div>
                </form>

                <button
                    className="btn btn-sm btn-danger mr-3"
                    onClick={this.deleteCar}
                >
                    Delete
                </button>

                <button
                    type="submit"
                    className="btn btn-sm btn-primary"
                    onClick={this.updateCar}
                >
                    Update
                </button>

                <Link to="/cars-list">
                    <button className="btn btn-sm btn-info float-right">
                        Return to cars list
                    </button>
                </Link>

                <p>{this.state.message}</p>

            </div>
        );
    }
}