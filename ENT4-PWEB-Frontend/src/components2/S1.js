import React, { useState, useEffect } from "react";
import axios from "axios";
import S2 from "./S2";
import UpdateComponent from "./Update.component";
import CreateComponent from "./Create.component";
import DeleteComponent from "./Delete.component";
import Pdf from "./pdf/Pdf";
import Uploader from "./Uploader";
import Deleter from "./Deleter";
import { IpBackend, PortBackend } from "./ip.backend";

function S1({ id, admin, techno }) {
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [symps, setSymp] = useState([]);
  const [symps2, setSymp2] = useState([]);
  const [solution, setSolution] = useState(false);
  const [isModify, setisModify] = useState(false);
  const [a, setA] = useState([]);

  const uri = `https://${IpBackend}/s1/${id}`;
  const [findabr, setFindabr] = useState("");

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

  function x(id_s1) {
    axios
      .get(`https://${IpBackend}/solutionsbis/${id_s1}`)
      .then((res) => {
        // console.log(res);
        if (res.data[0]) {
          // console.log("OO");
          setSolution(false);
          setSymp2(res.data);
        } else {
          // console.log("IN");
          setSolution(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function choixPb(e, i) {
    setisSet(!isSet);
    setfocusedlist(e.target.value);
    const newA = a;
    if (newA[i] === e.target.value) {
      newA[i] = 0;
    } else {
      newA[i] = e.target.value;
      setA(newA);
    }
  }

  function rechercheArbre(e) {
    setFindabr(e.target.value);
    if (
      e.target.value === "" ||
      e.target.value === " " ||
      findabr === undefined
    ) {
      axios
        .get(uri)
        .then((res) => {
          setSymp(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `https://${IpBackend}/searchs1/${id}&${e.target.value}`
        )
        .then((res) => {
          setSymp(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className={techno + "s1"}>
      <input
        className={techno + "-mains1Filter"}
        type="text"
        placeholder="Filtrer"
        defaultValue=""
        onChange={(e) => {
          rechercheArbre(e);
        }}
      ></input>
      {symps.map((symp, i) => (
        <div className="" key={symp.id_s1}>
          <div className={techno + "-container-s1"}>
            <button
              className={techno + "-button-title-pb"}
              value={symp.id_s1}
              onClick={(e) => {
                choixPb(e, i);
                x(symp.id_s1);
              }}
            >
              {symp.title_s1}
            </button>
            <button
              className={techno + "-fleche"}
              value={symp.id_s1}
              onClick={(e) => {
                choixPb(e, i);
                x(symp.id_s1);
              }}
            ></button>
            {admin && (
              <button
                className={techno + "-ecrou"}
                value={symp.id_s1}
                onClick={(e) => {
                  setisModify(!isModify);
                  setfocusedlist(e.target.value);
                  x(symp.id_s1);
                }}
              ></button>
            )}
            {isModify && focusedlist === `${symp.id_s1}` && (
              <div className={techno + "-main_crud"}>
                <UpdateComponent
                  id={symp.id_s1}
                  title={symp.title_s1}
                  base={"s1"}
                  champ={"title_s1"}
                  techno={techno}
                />

                <CreateComponent
                  id={symp.id_s1}
                  title={symp.title_s2}
                  champ={"title_s2"}
                  champ2={"ind_s1"}
                  base={"s2"}
                  techno={techno}
                />
                <DeleteComponent
                  id={symp.id_s1}
                  base={"s1"}
                  champ={"id_s1"}
                  name={symp.title_s1}
                  techno={techno}
                />

                {solution ? (
                  <Uploader id={symp.id_s1} from="s1" techno={techno} />
                ) : (
                  <Deleter id={symp.id_s1} from="s1" techno={techno} />
                )}
              </div>
            )}
          </div>
          {a[i] === `${symp.id_s1}` ? (
            !solution ? (
              <div className={techno + "solution"}>
                {symps2.map((symp) => (
                  <div className={techno + "-position-pdf"} key={symp.id_s1}>
                    <Pdf file={"./pdf/" + symp.text} />{" "}
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <S2 id_s1={symp.id_s1} admin={admin} techno={techno} />
              </div>
            )
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default S1;
