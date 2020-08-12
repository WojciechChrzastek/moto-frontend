import React, {Component} from 'react';
import UserDataService from "../../services/user.service";

// import UserAlert from '../../alert.js';

export default class Register extends Component {

    constructor(props) {
        super(props);
        // this.alert = React.createRef();
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            username: "",
            password: "", 
            email: "",

            submitted: false
          };
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }

    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }

      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }

    saveUser() {
        var data = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email
        };

        UserDataService.create(data)
        .then(response => {
            this.setState({
            id: response.data.id,
            username: response.data.username,
            password: response.data.password,
            email: response.data.email,

            submitted: true
            });
            console.log(response.data);
        })        
        .catch(e => {
            console.log(e);
        });    
    }

    newUser() {
        this.setState({
          id: null,
          username: "",
          password: "",
          email: "",

          submitted: false
        });
      }

    render() {
        return (
            <div className="Register">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button
                        className="btn btn-success" onClick={this.newUser}>
                        Register
                        </button>
                    </div>
                ) : (    
                    <div className="Register">       
                    <h1 className="RegisterHeader">Register</h1>
                    
                    <form className="submit-form" onSubmit={this.handleSubmit}>               
                        
                        <div className="form-group" controlid="username">
                            <label htmlFor="username">Username</label>
                            <input 
                            className="form-control"
                            name="username"
                            id="username"
                            type="text"
                            placeholder="Enter username"
                            autoFocus
                            required
                            value={this.state.username}
                            onChange={this.onChangeUsername}/> 
                        </div>

                        <div className="form-group" controlid="password">
                            <label htmlFor="password">Password</label>
                            <input
                            className="form-control"
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Enter password"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}/>
                        </div>

                        <div className="form-group" controlid="email">
                            <label htmlFor="email">Email</label>
                            <input
                            className="form-control"
                            name="email"
                            id="email"
                            type="email"
                            placeholder="Enter email"
                            required
                            value={this.state.email}
                            onChange={this.onChangeEmail}/>
                            <small className="form-text text-muted">
                                Please provide a valid email address.
                            </small>
                        </div>

                        <button onClick={this.saveUser} className="btn btn-primary" type="submit" size="lg">Register</button>
                    </form>
                    </div>
                )}
            </div>
        );
    }
}

    // handleSubmit = event => {
    //     event.preventDefault();
    //     this.registerUser(event.target.username.value, event.target.password.value, event.target.email.value);
    // }

    // registerUser(username, password, email) {
    //     fetch('http://localhost:8080/users', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             username: username,
    //             password: password,
    //             email: email,
    //         })
    //     })
        // .then(function (response) {
        //     if (response.status === 200) {
        //         this.showAlert("success", "User registered!", "You can now log in using your credentials.");
        //     } else if (response.status === 422) {
        //         this.showAlert("danger", "User/email already exists", "Please choose a different name/email.");
        //     } else if (response.status === 406) {
        //         this.showAlert("danger", "Insufficient data.", "Please fill in all fields.");
        //     } else {
        //         this.showAlert("danger", "User not registered!", "Something went wrong.");
        //     }
        // }.bind(this)).catch(function (error) {
        //     this.showAlert("danger", "Error", "Something went wrong.");
        // }.bind(this));

    // }

    // showAlert(variant, heading, message) {
    //     this.alert.current.setVariant(variant);
    //     this.alert.current.setHeading(heading);
    //     this.alert.current.setMessage(message);
    //     this.alert.current.setVisible(true);
    // }



        //   <div className="submit-form">
        //     {this.state.submitted ? (
        //       <div>
        //         <h4>You submitted successfully!</h4>
        //         <button className="btn btn-success" onClick={this.newTutorial}>
        //           Add
        //         </button>
        //       </div>
        //     ) : (
        //       <div>
        //         <div className="form-group">
        //           <label htmlFor="title">Title</label>
        //           <input
        //             type="text"
        //             className="form-control"
        //             id="title"
        //             required
        //             value={this.state.title}
        //             onChange={this.onChangeTitle}
        //             name="title"
        //           />
        //         </div>
    
        //         <div className="form-group">
        //           <label htmlFor="description">Description</label>
        //           <input
        //             type="text"
        //             className="form-control"
        //             id="description"
        //             required
        //             value={this.state.description}
        //             onChange={this.onChangeDescription}
        //             name="description"
        //           />
        //         </div>
    
        //         <button onClick={this.saveTutorial} className="btn btn-success">
        //           Submit
        //         </button>
        //       </div>
        //     )}