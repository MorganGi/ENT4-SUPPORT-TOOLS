import React from "react";
import axios from "axios";
import { IpBackend, PortBackend } from "./ip.backend";

export default class CreateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updatee(
      this.state.value,
      this.props.base,
      this.props.id,
      this.props.champ,
      this.props.champ2
    );
    window.location.reload(false);
  }

  updatee(e, db, id, champ, champ2) {
    axios
      .post(
        `https://${IpBackend}/create/${db}&${id}&${e}&${champ}&${champ2}`
      )
      .then((res) => {
        console.log("put : ", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-box">
          <button className="btn-search-create">
            <i className="fasfa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Créer"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
