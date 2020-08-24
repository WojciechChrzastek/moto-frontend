import React, { Component } from "react";
import CarDataService from "../../services/car.service";

export default class AddCarComponent extends Component {
    constructor(props) {
        super(props);
        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.saveCar = this.saveCar.bind(this);
        this.newCar = this.newCar.bind(this);

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

    saveCar() {
        const data = {
            brandname: this.state.brandname,
            modelname: this.state.modelname,
            manufactureyear: this.state.manufactureyear
        };

        CarDataService.add(data)
            .then(response => {
                this.setState({
                    brandname: response.data.brandname,
                    modelname: response.data.modelname,
                    manufactureyear: response.data.manufactureyear
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    newCar() {
        this.setState({
            id: null,
            brandname: "",
            modelname: "",
            manufactureyear: 0
        });
    }

    render() {
        return (
            <div className="AddCar">
                <h1 className="AddCarHeader">Add car</h1>
                <form className="submit-form" onSubmit={this.handleSubmit}>

                    <div className="form-group" id="brandname">
                        <label htmlFor="brandname">Brand</label>
                        <input
                            className="form-control"
                            name="brandname"
                            id="brandname"
                            type="text"
                            placeholder="Enter brand"
                            autoFocus
                            required
                            value={this.state.brandname}
                            onChange={this.onChangeBrand}/>
                    </div>

                    <div className="form-group" id="modelname">
                        <label htmlFor="modelname">Model</label>
                        <input
                            className="form-control"
                            name="modelname"
                            id="modelname"
                            type="text"
                            placeholder="Enter model"
                            required
                            value={this.state.modelname}
                            onChange={this.onChangeModel}/>
                    </div>

                    <div className="form-group" id="modelname">
                        <label htmlFor="manufactureyear">Year</label>
                        <input
                            className="form-control"
                            name="manufactureyear"
                            id="manufactureyear"
                            type="text"
                            placeholder="Enter manufacture year"
                            required
                            value={this.state.manufactureyear}
                            onChange={this.onChangeYear}/>
                    </div>

                    <button
                        onClick={this.saveCar}
                        className="btn btn-primary"
                        type="submit"
                    >Add car
                    </button>
                </form>

            </div>
        );
    }
}