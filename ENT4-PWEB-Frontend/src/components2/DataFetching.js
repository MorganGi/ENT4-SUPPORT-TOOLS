import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/DataFetching.css";
import S1 from "./S1";
import UpdateComponent from "./Update.component";
import CreateComponent from "./Create.component";
import DeleteComponent from "./Delete.component";
import Searche from "./search/Search";
import Footer from "./Footer";
import { IpBackend, PortBackend } from "./ip.backend";

// import AuthService from "../services/auth.service";

function DataFetching({ admin, techno }) {
  const [isSet, setisSet] = useState(false);
  const [focusedlist, setfocusedlist] = useState();
  const [posts, setPosts] = useState([]);
  const [isModify, setisModify] = useState(false);
  const [a, setA] = useState([]);
  const [findabr, setFindabr] = useState("");

  useEffect(() => {
    axios
      .get(`https://${IpBackend}/pb/${techno}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); //ATTENTION --> []

  function rechercheArbre(e) {
    setFindabr(e.target.value);
    if (
      e.target.value === "" ||
      e.target.value === " " ||
      findabr === undefined
    ) {
      axios
        .get(`https://${IpBackend}/pb/${techno}`)
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get(
          `https://${IpBackend}/searchpb/${techno}/${e.target.value}`
        )
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  return (
    <div>
      <div className={techno + "-master"}>
        <div className={techno + "-faq-list-pb"}>
          <Searche techno={techno} />
          <input
            className={techno + "-mainpbFilter"}
            type="text"
            placeholder="Filtrer"
            defaultValue=""
            onChange={(e) => {
              rechercheArbre(e);
            }}
          ></input>
          {posts.map(({ id, title_pb }, i) => (
            <div key={id + "div"} id="mainpb" className={techno + "-mainpb"}>
              <div key={id + "div2"} className={techno + "-container-pb"}>
                <button
                  className={techno + "-button-title-pb"}
                  value={id}
                  onClick={(e) => choixPb(e, i)}
                >
                  {title_pb}
                </button>
                <button
                  className={techno + "-fleche"}
                  value={id}
                  onClick={(e) => choixPb(e, i)}
                ></button>
                {admin && (
                  <button
                    className={techno + "-ecrou"}
                    value={id}
                    onClick={(e) => {
                      setisModify(!isModify);
                      setfocusedlist(e.target.value);
                    }}
                  ></button>
                )}
                {isModify && focusedlist === `${id}` && (
                  <div key={id} className={techno + "-main_crud"}>
                    <UpdateComponent
                      id={id}
                      title={title_pb}
                      base={"pb"}
                      champ={"title_pb"}
                      techno={techno}
                    />
                    <CreateComponent
                      id={id}
                      base={"s1"}
                      champ={"title_s1"}
                      champ2={"ind_pb"}
                      title={title_pb}
                      techno={techno}
                    />
                    <DeleteComponent
                      id={id}
                      base={"pb"}
                      champ={"id"}
                      name={title_pb}
                      techno={techno}
                    />
                  </div>
                )}
              </div>

              {a[i] === `${id}` ? (
                <div className={techno + "-choix-main"}>
                  <S1 id={id} admin={admin} techno={techno} />
                </div>
              ) : null}
            </div>
          ))}
          {admin && (
            <div className={techno + "-main-create"}>
              <CreateComponent
                id={"1"}
                base={"pb"}
                champ={"title_pb"}
                champ2={techno}
                title={"a"}
                techno={techno}
              />
            </div>
          )}
        </div>
        <div className={techno + "-faq-list-pb2"}></div>
      </div>
      <Footer techno={techno} />
    </div>
  );
}

export default DataFetching;
