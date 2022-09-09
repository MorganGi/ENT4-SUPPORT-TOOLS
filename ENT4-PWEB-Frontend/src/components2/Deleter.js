import React, {useState} from "react";
import axios from "axios";
import { IpBackend, PortBackend } from "./ip.backend";

function Deleter({ id, from }) {
  const [message, setMessage] = useState("")

  const handleSubmission = (e) => {
    axios
      .get(`https://${IpBackend}/solutions/del/${id}&${from}`)
      .then((res) => {
      setMessage("Fichier PDF supprimé")

      setTimeout(() => {
      setMessage("") 
      }, 3000)
      })
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
      {message && <div className="alert alert-success">{message}</div>}
    </div>
  );
}

export default Deleter;
