import React, { useState, useEffect } from "react";
import axios from "axios";
import Solutions from "./Solutions";
import UpdateComponent from "./Update.component";

import Uploader from "./Uploader";
import Deleter from "./Deleter";
import DeleteComponent from "./Delete.component";
import { IpBackend, PortBackend } from "./ip.backend";
function S2({ id_s1, admin, techno }) {
  const [symps, setSymp] = useState([]);
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [isModify, setisModify] = useState(false);
  const [a, setA] = useState([]);

  const uri = `https://${IpBackend}/s2/${id_s1}`;

  function choixPb(e, i) {
    setisSet(!isSet);
    setfocusedlist(e.target.value);

    const newA = a;
    if (newA[i] === e.target.value) {
      newA[i] = 0;
    } else {
      newA[i] = e.target.value;
      for (let j = 0; j < newA.length; j++) {
        if (i === j) {
          break;
        } else {
          newA[j] = 0;
        }
      }
      setA(newA);
    }
  }

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

  // const categories = symps.reduce(
  //   (acc, symp) =>
  //     acc.includes(symp.title_s2) ? acc : acc.concat(symp.title_s2),
  //   []
  // );

  return (
    <div className="s2">
      {symps.map((symp, i) => (
        <div className={techno + "-main"} key={symp.id_s2}>
          <div className={techno + "-container-s2"}>
            <button
              className={techno + "-button-title-pb"}
              value={symp.id_s2}
              onClick={(e) => choixPb(e, i)}
            >
              {symp.title_s2}
            </button>
            <button
              className={techno + "-fleche"}
              value={symp.id_s2}
              onClick={(e) => choixPb(e, i)}
            ></button>
            {admin && (
              <button
                className={techno + "-ecrou"}
                value={symp.id_s2}
                onClick={(e) => {
                  setisModify(!isModify);
                  setfocusedlist(e.target.value);
                }}
              ></button>
            )}
            {isModify && focusedlist === `${symp.id_s2}` && (
              <div className={techno + "-main_crud"}>
                <UpdateComponent
                  id={symp.id_s2}
                  title={symp.title_s2}
                  base={"s2"}
                  champ={"title_s2"}
                  techno={techno}
                />
                <DeleteComponent
                  id={symp.id_s2}
                  base={"s2"}
                  champ={"id_s2"}
                  name={symp.title_s2}
                  techno={techno}
                />
                <Deleter id={symp.id_s2} from="s2" techno={techno} />
                <Uploader id={symp.id_s2} from="s2" techno={techno} />
              </div>
            )}
          </div>
          {a[i] === `${symp.id_s2}` ? (
            <div className={techno + "-solution"}>
              <Solutions techno={techno} id_s2={symp.id_s2} />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default S2;
