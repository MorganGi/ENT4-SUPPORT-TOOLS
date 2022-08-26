import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/manager.css";
import { IpBackend, PortBackend } from "../ip.backend";

function UserManager() {
  const [users, setUsers] = useState([]);
  const [defaultroles, setDefaultRoles] = useState([]);
  const [info, setInfo] = useState(false);
  const [addroles, setAddRoles] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function delUser(e, name) {
    const answer = window.confirm(
      "Etes-vous sur de vouloir supprimer : " + name
    );
    if (answer) {
      axios
        .post(
          `https://${IpBackend}/del/user/${e.target.value}`
        )
        .then(() => {
          setInfo(true);
          setTimeout(() => {
            setInfo(!info);
          }, 5000);
        });
    }
  }

  useEffect(() => {
    axios
      .get(`https://${IpBackend}/get/users`)
      .then((res) => {
        const tabUsers = res.data.map((item) => item);
        setUsers(tabUsers);
      });
    axios
      .get(`https://${IpBackend}/get/allroles`)
      .then((res) => {
        setDefaultRoles(res.data);
      });
  }, []);

  function onChangeGroupe(e) {
    if (addroles.includes(e.target.value)) {
      const value = addroles.filter((item) => item !== e.target.value);
      setAddRoles(value);
    } else {
      setAddRoles(addroles.concat(e.target.value));
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function updateRoles(e, name) {
    const answer = window.confirm(
      "Etes-vous sur de vouloir modifier : " + name
    );
    if (answer) {
      axios
        .put(
          `https://${IpBackend}/update/roles/${e.target.value}`,
          {
            addroles,
          }
        )
        .catch((res) => {
          console.log(res);
        });
      window.location.reload();
    }
  }

  return (
    <div className="manager-container">
      <div className="manager-info">
        <div className="manager-user-info">Utilisateurs</div>
        <div className="manager-roles-info">
          <div>Roles</div>
        </div>
        <div
          className="manager-del-user-info"
          type="button"
          placeholder="Supprimer"
        >
          Action
        </div>
      </div>
      {users.map((item, i) => (
        <div>
          {item.username === "admin" ? (
            <div className="manager-admin">
              <div key={item.id + "a"} className="manager-user-admin">
                {item.username}
              </div>
              <div className="manager-roles-admin">
                {item.roles.map((roles) => (
                  <div
                    key={roles.id + "a"}
                    className="manager-roles-child-admin"
                  >
                    {roles.name}
                  </div>
                ))}
              </div>

              <div
                key={item.id}
                className="manager-del-user-admin"
                type="button"
                value={item.id}
                placeholder="Supprimer"
              ></div>
            </div>
          ) : (
            <div className="manager">
              <div key={item.id} className="manager-user">
                {item.username}
              </div>
              <div className="manager-roles">
                {item.roles.map((role) => (
                  <div key={role.id} className="manager-roles-child">
                    {role.name}
                  </div>
                ))}
              </div>

              <button
                key={item.id + "b"}
                className="manager-del-user"
                type="button"
                value={item.id}
                placeholder="Supprimer"
                onClick={(e) => {
                  delUser(e, item.username);
                }}
              >
                Supprimer
              </button>
              <button
                key={item.id + "c"}
                className="manager-mod-user"
                type="button"
                value={item.id}
                placeholder="Modifier"
                onClick={(e) => {
                  updateRoles(e, item.username);
                }}
              >
                Modifier
              </button>
            </div>
          )}
        </div>
      ))}

      <div className="update-roles">
        <h4 className="update-roles-child-1">Selection des roles</h4>
        {defaultroles.map((ro, i) => (
          <div className="update-roles-child">
            <div className="update-roles-child-box">{ro.name}</div>
            <input
              key={ro.id + "d"}
              type="checkbox"
              value={ro.id}
              onChange={(e) => onChangeGroupe(e)}
            ></input>
          </div>
        ))}
      </div>

      {info && (
        <div className="alert alert-success">
          Utilisateur supprimé avec Succès
        </div>
      )}
    </div>
  );
}

export default UserManager;
