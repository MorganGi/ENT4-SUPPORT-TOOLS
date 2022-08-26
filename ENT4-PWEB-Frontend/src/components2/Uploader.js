import React, { useState } from "react";
import axios from "axios";
import { IpBackend, PortBackend } from "./ip.backend";

function Uploader({ id, from, techno }) {
  const [selectedFile, setSelectedFile] = useState();
  const [message, setMessage] = useState("");

  function changeHandler(event) {
    setSelectedFile(event.target.files[0]);
  }

  function handleSubmission(e) {
    e.preventDefault();
    const maxsize = 1 * 1024 * 1024;

    const size = selectedFile.size;
    console.log(size);

    if (size < maxsize) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      axios
        .post(
          `https://${IpBackend}/upload-avatar/${techno}/${id}&${from}`,
          formData
        )
        .catch((e) => {
          console.error("Error-UPDATER", e);
        });
      setMessage("");
    } else {
      setMessage(
        "Fichier trop volumineux, Taille max : " + maxsize / 1024 + " KBits"
      );
    }
  }

  return (
    <div>
      <form
        className="formUpload"
        method="POST"
        action="#"
        id="#"
        onSubmit={handleSubmission}
      >
        <input
          className={techno + "-inputUpload"}
          type="file"
          onChange={changeHandler}
        />
        <input className={techno + "-submitUpload"} type="submit" />
      </form>
      {message && <div className="alert alert-danger">{message}</div>}
    </div>
  );
}

export default Uploader;
