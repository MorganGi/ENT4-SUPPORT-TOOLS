import React from "react";
import axios from "axios";
import "../styles/DataFetching.css";
import { IpBackend, PortBackend } from "./ip.backend";
export default class UpdateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.title };
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
      this.props.title,
      this.props.champ,
      this.props.id
    );
    window.location.reload(false);
  }

  updatee(e, db, title, champ, id) {
    axios
      .put(
        `https://${IpBackend}/update/${db}&${title}&${e}&${id}&${champ}`
      )
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-box">
          <button className="btn-search-update">
            <i className="fasfa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Mise à jour"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
