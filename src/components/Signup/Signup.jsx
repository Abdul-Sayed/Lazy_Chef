import React, { Component } from "react";
import "./Signup.css";

export class Signup extends Component {
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
    fetch("http://localhost:3000/signup", {
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
        <div className="signup">
          <h1>Sign Up Please</h1>
          <form
            autoComplete="off"
            onSubmit={this.handleSubmit}
            className="signup-form"
          >
            <input
              className="signup-input"
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
            <button className="signup-button" type="submit">
              Enter
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;
