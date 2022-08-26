import React, { Component } from "react";
import UserService from "../services/user.service";
import "../components2/DataFetching.js";
import axios from "axios";
import "../styles/home.css";

import { IpBackend, PortBackend } from "../components2/ip.backend";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: "",
    };
    axios.get(`https://${IpBackend}/`).then((res) => {
      console.log(res);
    });
  }
  componentDidMount() {
    UserService.getPublicContent().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }
  render() {
    return (
      <div>
        <div className="flex-container">
          <div className="flex-gauche">
            <div className="parallax-wisper"></div>
          </div>
          <div className="flex-droit">
            <div className="text-wisper">
              <h1>Wisper</h1>
              <br />
              <p>
                Wisper est un acteur majeur des solutions de PC managés en
                entreprise.
              </p>

              <p>
                Depuis 2009, nos innovations s’intègrent dans la transformation
                digitale des entreprises, au travers de solutions intelligentes,
                connectées et à forte valeur ajoutée pour la DSI.
              </p>

              <p>
                Au travers de solutions smart et éco-friendly, nous réinventons
                le PC d’entreprise, pour proposer des postes de travail
                performants, gérés de manière centralisée sans aucune
                contrainte.
              </p>

              <p>
                Wisper provides software virtualization for desktop. it’s 100%
                french, based in Rouen with locations in Levallois-Perret and
                Casablanca.
              </p>

              <p>
                ceBox® is a highly innovative managed PC solution. Inspired by
                the best aspects of traditional PCs and of desktop
                virtualization, ceBox® offers centralized management of your
                entire stock of computers without any server infrastructure and
                with unrivaled performance for users.
              </p>

              <p>
                Our vision: Bring your IT infrastructures to the digital era by
                making it secured, connected, flexible, economical, very simple
                to manage and provided with performance at least as good as
                traditional desktops.
              </p>
            </div>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-gauche">
            <div className="text-xivo">
              <h1>Xivo</h1>
              <br />
              <p>
                Première solution Open Source de communications unifiées et
                centre d’appels. Scalable et interopérable, XiVO est le trublion
                la téléphonie IP, avec un business modèle disruptif : pas de
                coût de licence par utilisateur. XiVO facilite la collaboration
                au sein de l’entreprise pour plus de productivité.
              </p>
            </div>
          </div>
          <div className="flex-droit">
            <div className="parallax-xivo"> </div>
          </div>
        </div>

        <div className="flex-container">
          <div className="flex-gauche">
            <div className="parallax-cebox"></div>
          </div>
          <div className="flex-droit">
            <div className="text-cebox">
              <h1>Cebox</h1>
              <br />
              <p>
                ceBox est l’unique solution de virtualisation de PC sans
                infrastructure de serveur qui fonctionne sur tous les types
                d’ordinateurs, portables et postes de travail : au travail, ou à
                la maison. ceBox facilite le déploiement et la gestion des
                postes de travail pour un pilotage centralisé et sécurisé.
              </p>
            </div>
          </div>
        </div>
      </div>

      //
      //

      //
      //
    );
  }
}
