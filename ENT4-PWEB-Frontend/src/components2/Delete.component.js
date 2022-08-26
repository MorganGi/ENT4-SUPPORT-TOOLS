import React from "react";
import axios from "axios";
import { IpBackend, PortBackend } from "./ip.backend";

export default class DeleteComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updatee(this.props.id, this.props.base, this.props.champ);
  }

  updatee(id, db, champ) {
    const answer = window.confirm(
      "Etes-vous sur de vouloir supprimer : " + this.props.name
    );
    if (answer) {
      // Save it!
      console.log("Thing was saved to the database.");

      axios
        .delete(
          `https://${IpBackend}/delete/${id}&${db}&${champ}`
        )
        .then((res) => {
          console.log("PUTting : ", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      window.location.reload(false);
    } else {
      console.log("Catégorie non supprimée.");
    }
  }

  butDelete(e) {
    console.log(e.target.value);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="search-box">
          <button className="btn-search-delete">
            <i className="fasfa-search"></i>
          </button>
          <input
            type="submit"
            className="input-search"
            value="Supprimer item"
          />
        </div>
      </form>
    );
  }
}
