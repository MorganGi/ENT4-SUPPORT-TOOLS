import axios from "axios";
import React, { useState } from "react";
import Pdf from "../pdf/Pdf";
import "./searche.css";
import { IpBackend, PortBackend } from "../ip.backend";

function Searche({ techno }) {
  const [searched, setSearched] = useState("");
  const [texts, setText] = useState([]);
  // const [focusedlist, setfocusedlist] = useState();
  const [defaulte, setDefaulte] = useState("");
  const [a, setA] = useState([]);
  const [isModify, setisModify] = useState(false);

  function choixPb(e, i) {
    // setfocusedlist(e.target.value);
    const newA = a;
    if (newA[i] === e.target.value) {
      newA[i] = 0;
      setisModify(false);
    } else {
      setisModify(true);
      newA[i] = e.target.value;
      for (let j = 0; j < newA.length; j++) {
        if (i === j) {
          console.log("");
        } else {
          newA[j] = 0;
        }
      }
      console.log(newA);
      setA(newA);
    }
  }

  const handleSubmission = (e) => {
    e.preventDefault();
    setDefaulte("Chargement ...");

    var i = 0;
    var timesRun = 0;
    function change() {
      if (timesRun === 1) {
        clearInterval(interval);
      }
      var doc = document.getElementById("loading");
      var color = ["white", "#ffaeae"];
      doc.style.backgroundColor = color[i];
      i = (i + 1) % color.length;
    }
    var interval = setInterval(change, 500);

    if (searched !== "") {
      axios
        .get(
          `https://${IpBackend}/extract-text/${techno}`, {params: {search : searched},}
        )
        .then((res) => {
          if (res.data.length === 0) {
            setDefaulte("Aucun article trouvÃ ou recherche invalide.");
            timesRun = 1;
          } else {
            setDefaulte("");
            setText(res.data);
            timesRun = 1;
          }
        });
    } else {
      setDefaulte("Recherche vide.");
      timesRun = 1;
    }
  };

  const recherche = (e) => {
    setSearched(e.target.value);
  };

  return (
    <div className="mainDiv-search">
      <div className="formSearch">
        <form method="POST" onSubmit={handleSubmission}>
          <div className="search-box">
            <button className="btn-search">
              <i className="fasfa-search"></i>
            </button>
            <input
              type="text"
              className="input-search"
              placeholder="Rechercher"
              onChange={(e) => recherche(e)}
            />
          </div>
        </form>
      </div>

      {!defaulte ? (
        texts.map(({ text, titre, titredoc }, i) => (
          <div key={i} className="res-of-search">
            <h3>{titredoc}</h3>{" "}
            {text.split("AAA").map((res, i) => (
              <li key={i}>{res}</li>
            ))}
            <br />
            <button
              className="btn btn-primary"
              value={i}
              onClick={(e) => choixPb(e, i)}
            >
              Voir l'article
            </button>
            {isModify && a[i] === `${i}` && (
              <div className={techno + "-position-pdf"}>
                <Pdf file={"./pdf/" + titre} />{" "}
              </div>
            )}
          </div>
        ))
      ) : (
        <div id="loading" className="chargement">
          {defaulte}
        </div>
      )}
    </div>
  );
}
export default Searche;
