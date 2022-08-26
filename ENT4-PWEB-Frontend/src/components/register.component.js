import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";
import axios from "axios";
import "../styles/register.css";
import { IpBackend, PortBackend } from "../components2/ip.backend";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};
const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};
const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeGroupe = this.onChangeGroupe.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      rolesdisplay: [],
      roles: [],
    };
    var tab = [];
    axios.get(`https://${IpBackend}/roles`).then((roles) => {
      for (let i = 0; i < roles.data.length; i++) {
        tab.push(roles.data[i].name);
      }
      this.setState({
        rolesdisplay: tab,
      });
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeGroupe(e) {
    if (this.state.roles.includes(e.target.value)) {
      const value = this.state.roles.filter((item) => item !== e.target.value);
      this.setState({ roles: value });
    } else {
      this.setState({ roles: this.state.roles.concat(e.target.value) });
    }
    // DEBBUG BOX
    // setTimeout(() => {
    //   console.log(this.state.roles);
    // }, [10]);
  }
  handleRegister(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
    });
    this.form.validateAll();
    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password,
        this.state.roles
      ).then(
        (response) => {
          this.setState({
            message: response.data.message,
            successful: true,
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            successful: false,
            message: resMessage,
          });
        }
      );
    }
  }
  render() {
    return (
      <div className="">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Identifiant</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Mot de passe</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>
                <div className="register-box">
                  <div className="register-box-child">
                    <input
                      type="checkbox"
                      name="check-1"
                      value="user"
                      onChange={this.onChangeGroupe}
                    />
                    <label htmlFor="check-1">User</label>
                  </div>
                  <div className="register-box-child">
                    <input
                      type="checkbox"
                      name="check-2"
                      value="xivo"
                      onChange={this.onChangeGroupe}
                    />
                    <label htmlFor="check-2">Xivo</label>
                  </div>
                  <div className="register-box-child">
                    <input
                      type="checkbox"
                      name="check-3"
                      value="cebox"
                      onChange={this.onChangeGroupe}
                    />
                    <label htmlFor="check-3">Cebox</label>
                  </div>
                  <div className="register-box-child">
                    <input
                      type="checkbox"
                      name="check-3"
                      value="admin"
                      onChange={this.onChangeGroupe}
                    />
                    <label htmlFor="check-3">Admin</label>
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Créer</button>
                </div>
              </div>
            )}
            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
