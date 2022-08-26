import React, { Component } from "react";
import UserService from "../services/user.service";
import DataFetching from "../components2/DataFetching";
import "../styles/DataFetching.css";

export default class BoardXivo extends Component {
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
      <div className="master-container">
        {this.state.access ? (
          <DataFetching admin={true} techno={"xivo"} />
        ) : (
          <div className="alert alert-danger">
            Votre token est expiré / non valide connectez vous de nouveau
          </div>
        )}
      </div>
    );
  }
}
