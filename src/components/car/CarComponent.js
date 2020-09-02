import React, {Component} from "react";
import CarDataService from "../../services/CarDataService";
import {Link} from "react-router-dom";
import UserAlertComponent from "../user-alert/UserAlertComponent";

export default class CarComponent extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
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
            }
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
                this.showAlert("success", "Car updated!", "You can now check it in the cars list.");
            })
            .catch(
                error => {
                    if (error.response.status === 406) {
                        this.showAlert("danger", "Car not updated!", "Please fill in all fields.");
                    } else if (error.response.status === 422) {
                        this.showAlert("danger", "Car not updated!", "Please provide a valid car manufacture year.");
                    } else if (error.response.status === 404) {
                        this.showAlert("danger", "Car not updated!", "Selected car has not been found.");
                    } else if (error.response.status === 409) {
                        this.showAlert("danger", "Car not updated!", "The car already exists in the database.");
                    } else {
                        this.showAlert("danger", "Car not updated!", "Something went wrong.");
                    }
                }
            )
    }

    deleteCar() {
        CarDataService.delete(this.state.currentCar.id)
            .then(response => {
                this.showAlert("success", "Car deleted!", "You will not see it in the cars list.");
            })
            .catch(
                error => {
                    if (error.response.status === 404) {
                        this.showAlert("danger", "Car not deleted!", "There is no car of given ID.");
                    } else {
                        this.showAlert("danger", "Car not deleted!", "Something went wrong.");
                    }
                }
            )
    }

    showAlert(variant, heading, message) {
        console.log(message);
        this.alert.current.setVisible(true);
        this.alert.current.setVariant(variant);
        this.alert.current.setHeading(heading);
        this.alert.current.setMessage(message);
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

                <UserAlertComponent ref={this.alert}/>

            </div>
        );
    }
}