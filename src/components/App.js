import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Login from './Login/Login';
import SignUp from './Signup/Signup';
import Favorite from './Favorite/Favorite'
import Home from './Home/Home';
import './App.css';


class App extends Component {

  state = {
    username: "",
    userId: ""
    // favoritedRecipes: []
  }

  componentDidMount() {
    // if (localStorage.token) {
    //   fetch('http://localhost:3000/user', {
    //     headers: {
    //       'Authorization': `Bearer ${localStorage.token}`
    //     }
    //   })
    //     .then(res => res.json())
    //     .then(user => this.setState({ username: user.username }, () => console.log(this.state.username)))
    // } else {
    //   this.props.history.push('/login')
    // }
  }

  // addRecipe = (recipe) => {
  //   console.log('Recipe sent to App component: ', recipe)

  //   this.setState({
  //     favoritedRecipes: [...this.state.favoritedRecipes, recipe]
  //   }, () => console.log('Favorited Recipes List: ', this.state.favoritedRecipes))

  //   //POST FETCH
  //   fetch('http://localhost:3000/saved_recipes', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     },
  //     body: JSON.stringify({
  //       title: recipe.title,
  //       image: recipe.image,
  //       recipe_api_id: recipe.id,
  //       missing_ingredient_count: recipe.missedIngredientCount
  //     })
  //   })
  //     .then(response => response.json())
  //     .then(parsedResponse => {
  //       console.log(parsedResponse);
  //     })
  //     .catch(error => {
  //       console.log(error.message);
  //     });

  // }


  setUserDetails = (username, userId) => {
    console.log(username, userId)
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

export default App;






/*
  cont recipe = {
    id: 129893
    image: "https://spoonacular.com/recipeImages/129893-312x231.jpg"
    imageType: "jpg"
    likes: 0
    missedIngredientCount: 0
    missedIngredients: []
    title: "Honey Almond Date Balls"
    unusedIngredients: [{…}]
    usedIngredientCount: 3
    usedIngredients: (3) [{…}, {…}, {…}]
  }
*/