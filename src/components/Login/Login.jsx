import React, { Component } from "react";
import "./Login.css";

export class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.token = data.token;
          this.props.history.push("/home");
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="login">
          <h1>Log in Foodie!</h1>
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="login-form"
          >
            <input
              className="login-input"
              type="text"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />

            <input
              className="password-input"
              type="password"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <button className="login-button" type="submit">
              Log In
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Login;