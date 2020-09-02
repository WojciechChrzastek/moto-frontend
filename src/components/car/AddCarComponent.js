import React, {Component} from "react";
import CarDataService from "../../services/CarDataService";

import UserAlertComponent from '../user-alert/UserAlertComponent.js';

export default class AddCarComponent extends Component {
    constructor(props) {
        super(props);
        this.alert = React.createRef();
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.addCar = this.addCar.bind(this);
        this.newCar = this.newCar.bind(this);

        this.state = {
            id: null,
            brandname: "",
            modelname: "",
            manufactureyear: "",
        };
    }

    onChangeBrand(e) {
        this.setState({
            brandname: e.target.value
        });
    }

    onChangeModel(e) {
        this.setState({
            modelname: e.target.value
        });
    }

    onChangeYear(e) {
        this.setState({
            manufactureyear: e.target.value
        });
    }

    addCar() {
        const data = {
            brandname: this.state.brandname,
            modelname: this.state.modelname,
            manufactureyear: this.state.manufactureyear
        };

        CarDataService.add(data)
            .then(response => {
                this.showAlert("success", "Car added!", "You can now see it in the cars list.");
                this.setState({
                    brandname: response.data.brandname,
                    modelname: response.data.modelname,
                    manufactureyear: response.data.manufactureyear
                });
                this.newCar();
            })
            .catch(
                error => {
                    if (error.response.status === 406) {
                        this.showAlert("danger", "Car not added!", "Please fill in all fields.");
                    } else if (error.response.status === 422) {
                        this.showAlert("danger", "Car not added!", "Please provide a valid car manufacture year.");
                    } else if (error.response.status === 409) {
                        this.showAlert("danger", "Car not added!", "The car already exists in the database.");
                    } else {
                        this.showAlert("danger", "Car not added!", "Something went wrong.");
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

    newCar() {
        this.setState({
            id: null,
            brandname: "",
            modelname: "",
            manufactureyear: ""
        });
    }

    render() {
        return (
            <div className="add-car-form">
                <h1 className="add-car-header">Add car</h1>
                <form className="submit-form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="brandname">Brand</label>
                        <input
                            className="form-control"
                            name="brandname"
                            type="text"
                            placeholder="Enter brand"
                            autoFocus
                            required
                            value={this.state.brandname}
                            onChange={this.onChangeBrand}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="modelname">Model</label>
                        <input
                            className="form-control"
                            name="modelname"
                            type="text"
                            placeholder="Enter model"
                            required
                            value={this.state.modelname}
                            onChange={this.onChangeModel}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="manufactureyear">Year</label>
                        <input
                            className="form-control"
                            name="manufactureyear"
                            type="number" min="1901" max="2155" step="1"
                            placeholder="Enter manufacture year"
                            required
                            value={this.state.manufactureyear}
                            onChange={this.onChangeYear}/>
                        <small className="form-text text-muted">
                            Please provide a date in the range from 1901 to 2155.
                        </small>
                    </div>
                    <button
                        onClick={this.addCar}
                        className="btn btn-primary"
                        type="submit"
                    >Add car
                    </button>
                </form>
                <UserAlertComponent ref={this.alert}/>
            </div>
        );
    }
}
