import React, { Component } from "react";
import DataFetching from "../components2/DataFetching";
import "../styles/DataFetching.css";

export default class BoardCeboxPublic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
  }

  // componentDidMount() {
  //   UserService.getUserBoard().then(
  //     (response) => {
  //       this.setState({
  //         content: response.data,
  //       });
  //       console.log(response.data);
  //     },
  //     (error) => {
  //       this.setState({
  //         content:
  //           (error.response &&
  //             error.response.data &&
  //             error.response.data.message) ||
  //           error.message ||
  //           error.toString(),
  //       });
  //     }
  //   );
  // }

  render() {
    return (
      <div className="master-container">
        <div className="master-container">
          <DataFetching admin={false} techno={"cebox"} />
        </div>
      </div>
    );
  }
}
