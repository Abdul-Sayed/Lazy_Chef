import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import Login from './Login/Login';
import SignUp from './Signup/Signup';
import Favorite from './Favorite/Favorite'
import Home from './Home/Home';
import './App.css';


class App extends Component {

  state = {

  }

  // componentDidMount() {
  //   if (localStorage.token) {
  //     fetch('http://localhost:3000/profile', {
  //       headers: {
  //         'Authorization': `Bearer ${localStorage.token}`
  //       }
  //     })
  //       .then(res => res.json())
  //       .then(user => this.setState({ username: user.username }))
  //   } else {
  //     this.props.history.push('/login')
  //   }
  // }

  render() {
    return (
      <Switch>
        <Route
          path={'/favorite'}
          render={routerProps => <Favorite {...routerProps} username={this.state.username} />} />
        <Route exact path={'/'} component={Home} />
        <Route path={'/login'} component={Login} />
        <Route path={'/signup'} component={SignUp} />
      </Switch>
    )
  }
}

export default App;