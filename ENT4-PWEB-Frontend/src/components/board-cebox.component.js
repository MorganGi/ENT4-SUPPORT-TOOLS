import React, { Component } from "react";
import DataFetching from "../components2/DataFetching";
import UserService from "../services/user.service";
import "../styles/DataFetching.css";

export default class BoardCebox extends Component {
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
        this.setState({
          content: response.data,
          access: true,
        });
      },
      (error) => {
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
      <div className="master-container">
        <div className="master-container">
          {this.state.access ? (
            <DataFetching admin={true} techno={"cebox"} />
          ) : (
            <div className="alert alert-danger">
              Votre token est expiré / non valide connectez vous de nouveau
            </div>
          )}
        </div>
      </div>
    );
  }
}
