import React from "react";
import axios from "axios";
import { IpBackend, PortBackend } from "./ip.backend";

function Deleter({ id, from }) {
  const handleSubmission = (e) => {
    axios
      .get(`https://${IpBackend}/solutions/del/${id}&${from}`)
      .catch((e) => {
        console.error("Error", e);
      });
  };
  return (
    <div>
      <div className="search-box">
        <button className="btn-search-delete">
          <i className="fasfa-search"></i>
        </button>
        <input
          type="submit"
          className="input-search"
          value="Supprimer PDF"
          onClick={handleSubmission}
        />
      </div>
    </div>
  );
}

export default Deleter;
