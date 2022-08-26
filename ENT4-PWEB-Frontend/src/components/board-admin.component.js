import React, { Component } from "react";
import UserManager from "../components2/user-manager/user-manager.component";
import Register from "./register.component";
import "../styles/manager.css";
import UserService from "../services/user.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
      access: false,
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      (response) => {
        console.log("GOOD");
        this.setState({
          content: response.data,
          access: true,
        });
        console.log(response.data);
      },
      (error) => {
        console.log("EROOOR");
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
          access: false,
        });
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.access ? (
          <div>
            <div className="admin-container">
              <div className="admin-container-g">
                <h1>Creer un compte</h1>
                <Register />
              </div>
              <div className="admin-container-d">
                <UserManager />
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-danger">
            Votre token est expiré / non valide connectez vous de nouveau
          </div>
        )}
      </div>
    );
  }
}
