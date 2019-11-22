import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './Login/Login';
import SignUp from './Signup/Signup';
import Favorite from './Favorite/Favorite'
import Home from './Home/Home';
import './App.css';


class App extends Component {

  state = {
    username: "",
    userId: ""
  }


  setUserDetails = (username, userId) => {
    this.setState({ username: username, userId: userId })
  }



  render() {
    return (
      <Switch>

        <Route
          exact path={'/'}
          render={routerProps =>
            <Login {...routerProps} loggedInUserDetails={this.setUserDetails} />
          } />

        <Route
          exact path={'/home'}
          render={routerProps =>
            // <Home {...routerProps} addRecipe={this.addRecipe} username={this.state.username} userId={this.state.userId} />
            <Home {...routerProps} username={this.state.username} userId={this.state.userId} />
          } />

        <Route
          path={'/favorite'}
          render={routerProps =>
            // <Favorite {...routerProps} username={this.state.username} userId={this.state.userId}
            //   favoritedRecipes={this.state.favoritedRecipes} />
            <Favorite {...routerProps} username={this.state.username} userId={this.state.userId} />
          } />

        <Route
          path={'/login'}
          render={routerProps =>
            <Login {...routerProps} loggedInUserDetails={this.setUserDetails} />
          } />

        <Route
          path={'/signup'}
          render={routerProps =>
            <SignUp {...routerProps} loggedInUserDetails={this.setUserDetails} />
          } />

      </Switch>
    )
  }
}

export default withRouter(App);