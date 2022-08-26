import React, { useState, useEffect } from "react";
import axios from "axios";
import Pdf from "./pdf/Pdf";
import { IpBackend, PortBackend } from "./ip.backend";

function Solutions({ id_s2, techno }) {
  const [symps, setSymp] = useState([]);

  const uri = `https://${IpBackend}/solutions/${id_s2}`;

  useEffect(() => {
    axios
      .get(uri)
      .then((res) => {
        setSymp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="solution">
      {symps.map((symp) => (
        <div className={techno + "-position-pdf"} key={symp.id_s2}>
          <Pdf file={"./pdf/" + symp.text} />{" "}
        </div>
      ))}
    </div>
  );
}

export default Solutions;
