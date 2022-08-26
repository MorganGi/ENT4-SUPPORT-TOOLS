import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./styles/wisper.jpg";
import AuthService from "./services/auth.service";
import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardCebox from "./components/board-cebox.component";
import BoardXivo from "./components/board-xivo.component";
import BoardXivoPublic from "./components/board-xivo-public.component";
import BoardCeboxPublic from "./components/board-cebox-public.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showXivoBoard: false,
      showCeboxBoard: false,
      currentUser: undefined,
    };
  }
  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showXivoBoard: user.roles.includes("ROLE_XIVO"),
        showCeboxBoard: user.roles.includes("ROLE_CEBOX"),
      });
    }
  }
  logOut() {
    AuthService.logout();
  }
  render() {
    const {
      currentUser,
      showModeratorBoard,
      showAdminBoard,
      showXivoBoard,
      showCeboxBoard,
    } = this.state;
    return (
      <div>
        <nav className="navbar-main">
          <Link to={"/"} className="logo">
            <img src={logo} className="logo-png" />
          </Link>
          <div className="navbar-div">
            <li className="navbar-item">
              <Link to={"/home"} className="navbar-link">
                Accueil
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="navbar-item">
                <Link to={"/mod"} className="navbar-link">
                  Espace Moderateur
                </Link>
              </li>
            )}
            {showXivoBoard && (
              <li className="navbar-item">
                <Link to={"/faq-xivo"} className="navbar-link">
                  FAQ XIVO
                </Link>
              </li>
            )}
            {showCeboxBoard && (
              <li className="navbar-item">
                <Link to={"/faq-cebox"} className="navbar-link">
                  FAQ CEBOX
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="navbar-item">
                <Link to={"/admin"} className="navbar-link">
                  Espace admin
                </Link>
              </li>
            )}

            {currentUser ? (
              <div className="">
                <li className="navbar-item">
                  <Link to={"/profile"} className="navbar-link">
                    {currentUser.username}
                  </Link>
                </li>
                <li className="navbar-item">
                  <a
                    href="/portal/login"
                    className="navbar-link"
                    onClick={this.logOut}
                  >
                    Déconnexion
                  </a>
                </li>
              </div>
            ) : (
              <div className="">
                <li className="navbar-item">
                  <Link to={"/login"} className="navbar-link">
                    S'identifier
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to={"/faq-xivo-pub"} className="navbar-link">
                    FAQ XIVO
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to={"/faq-cebox-pub"} className="navbar-link">
                    FAQ CEBOX
                  </Link>
                </li>
              </div>
            )}
          </div>
        </nav>

        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
          <Route path="/faq-xivo" component={BoardXivo} />
          <Route path="/faq-cebox" component={BoardCebox} />
          <Route path="/faq-xivo-pub" component={BoardXivoPublic} />
          <Route path="/faq-cebox-pub" component={BoardCeboxPublic} />
        </Switch>
      </div>
    );
  }
}
export default App;
