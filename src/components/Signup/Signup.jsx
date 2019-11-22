import React, { Component } from "react";
import "./Signup.css";

export class Signup extends Component {
  state = {
    username: "",
    password: "",
    loggedInUserName: "",
    loggedInUserId: ""
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // fetch("http://localhost:3000/signup", {
    fetch("https://lazy-chef-api.herokuapp.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.token = data.token;
          this.setState(
            {
              loggedInUserName: data.user.username,
              loggedInUserId: data.user.id
            },
            () =>
              this.props.loggedInUserDetails(
                this.state.loggedInUserName,
                this.state.loggedInUserId
              )
          );
          this.props.history.push("/home");
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="signup">
          <h1>
            Sign Up Please or{" "}
            <span onClick={() => this.props.history.push("/login")}>
              Log In
            </span>
          </h1>
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
              className="signup-password-input"
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
