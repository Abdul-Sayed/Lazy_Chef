import React, { Component } from "react";
import uuid from "uuid";
import "./Favorite.css";

class Favorite extends Component {
  state = {
    apiKey0: process.env.REACT_APP_SPOONACULAR1_API_KEY,
    apiKey: process.env.REACT_APP_SPOONACULAR2_API_KEY,
    username: "",
    ingredient: "",
    ingredientList: [],
    apiReturnedRecipes: [],
    apiFormattedReturnedRecipes: "",
    isMissingIngredients: false,
    isMissingInstructions: false,
    apiAllIngredients: [],
    apiMatchingIngredients: [],
    apiMissedIngredients: [],
    apiRecipeInstructions: {},
    sideBarWidth: "0",
    recipeDetails: "",
    recipeSteps: []
  };

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  componentDidMount() {
    if (localStorage.token) {
      // fetch("http://localhost:3000/user", {
      fetch("https://lazy-chef-api.herokuapp.com/user", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.fetchSavedRecipes();
        });
    } else {
      this.props.history.push("/login");
    }
  }

  fetchSavedRecipes = () => {
    // fetch("http://localhost:3000/user/saved_recipes", {
    fetch("https://lazy-chef-api.herokuapp.com/user/saved_recipes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.props.username
      })
    })
      .then(response => response.json())
      .then(fetched_DB_RecipeData => {
        fetched_DB_RecipeData.sort(
          (recp1, recp2) =>
            recp1.missing_ingredient_count - recp2.missing_ingredient_count
        );
        this.setState({ apiReturnedRecipes: fetched_DB_RecipeData }, () =>
          this.findRecipe()
        );
      })
      .catch(err => {
        console.error(err.message);
      });
  };

  findRecipe = () => {
    console.log("List of fetched_DB_Recipes: ", this.state.apiReturnedRecipes);

    const apiFormattedReturnedRecipes = this.state.apiReturnedRecipes.map(
      data =>
        data.missing_ingredient_count === 0 ? (
          <div
            className="recipe-results"
            key={uuid.v4()}
            onClick={() => this.getRecipeDetails(data.recipe_api_id)}
          >
            <h1>{data.title}</h1>
            <img
              className="recipe-results-img"
              src={data.image}
              alt={data.title}
              height="231"
              width="312"
            />
          </div>
        ) : (
          <div
            className="recipe-results"
            key={uuid.v4()}
            onClick={() => this.getRecipeDetails(data.recipe_api_id)}
          >
            <h1>{data.title}</h1>
            {this.state.isMissingInstructions && (
              <h2>
                Missing Instructions{" "}
                <span role="img" aria-label="Sad Emoji">
                  😓
                </span>
              </h2>
            )}
            <img
              className="recipe-results-img"
              src={data.image}
              alt={data.title}
              height="231"
              width="312"
            />
            {this.setState({ isMissingIngredients: true })}
          </div>
        )
    );
    this.setState({
      apiFormattedReturnedRecipes: apiFormattedReturnedRecipes
    });
  };

  getRecipeDetails = recipeId => {
    let queryString = `https://api.spoonacular.com/recipes/informationBulk?apiKey=${this.state.apiKey}&ids=${recipeId}`;

    fetch(queryString)
      .then(res => res.json())
      .then(fetchedRecipeInstructions => {
        this.setState(
          {
            apiRecipeInstructions: fetchedRecipeInstructions[0]
          },
          () => {
            const recipe = this.state.apiRecipeInstructions;

            console.log(
              "apiRecipeInstructions: ",
              this.state.apiRecipeInstructions
            );

            const recipeDetails = (
              <div className="recipe-details">
                <img src={recipe.image} alt={recipe.title} />
                <h1>{recipe.title}</h1>
                {recipe.preparationMinutes ? (
                  <h3>{`Prep Time : ${recipe.preparationMinutes} minutes`}</h3>
                ) : null}
                {recipe.cookingMinutes ? (
                  <h3>{`Cook Time : ${recipe.cookingMinutes} minutes`}</h3>
                ) : null}
                <h3>{`# Ingredients: ${recipe.extendedIngredients.length}`}</h3>
                <h3>{`# Servings: ${recipe.servings}`}</h3>
                {recipe.dishTypes.length > 0 ? (
                  <h3>{`Dish Type: ${recipe.dishTypes[0]}`}</h3>
                ) : null}
                <div className="recipe-ingredient-image">
                  {recipe.extendedIngredients.map(ingredient => {
                    return (
                      <img
                        key={uuid.v4()}
                        src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
                        alt="recipe ingredient"
                      />
                    );
                  })}
                </div>
                {this.listMissingIngredients(recipe.extendedIngredients)}
              </div>
            );

            this.setState({ recipeDetails: recipeDetails });

            if (recipe.instructions) {
              this.setState({
                recipeSteps: recipe.analyzedInstructions[0].steps
              });
            } else {
              this.setState({ isMissingInstructions: true });
            }

            this.setState({ sideBarWidth: "40vw" });
          }
        );
      })
      .catch(err => console.error(err));
  };

  listMissingIngredients = extendedIngredients => {
    let allIngredients = [];
    extendedIngredients.forEach(ingredient => {
      allIngredients.push(ingredient.name);
    });
    this.setState({ apiAllIngredients: [...new Set(allIngredients)] }, () => {
      console.log("List of apiAllIngredients: ", this.state.apiAllIngredients);
      console.log("ingredientList: ", this.state.ingredientList);

      let matchingArray = [];
      this.state.apiAllIngredients.map(ingredient => {
        return this.state.ingredientList.forEach(elem => {
          if (ingredient.includes(elem) || elem.includes(ingredient))
            matchingArray.push(ingredient);
        });
      });

      this.setState({ apiMatchingIngredients: [...new Set(matchingArray)] });

      let missingIngredients = this.state.apiAllIngredients.filter(
        o => matchingArray.indexOf(o) === -1
      );
      return this.setState({ apiMissedIngredients: missingIngredients });
    });
  };

  render() {
    console.log("props.username: ", this.props.username);
    return (
      <React.Fragment>
        <main className="main">
          <header>
            <button onClick={() => this.props.history.push("/home")}>
              Go Back
            </button>
            <button onClick={this.handleLogout}>Log Out</button>
          </header>

          <div className="username">
            {this.props.username ? (
              <h1>{this.props.username}'s Favorite Recipes</h1>
            ) : (
              <h1>getting your info...</h1>
            )}
          </div>

          <section className="recipe-results-container">
            {this.state.apiFormattedReturnedRecipes}
          </section>
        </main>

        <aside
          className="sidebar"
          style={{ width: `${this.state.sideBarWidth}` }}
        >
          <img
            className="closebtn"
            src="https://i.ibb.co/T822SpD/arrow.png"
            alt="Back Arrow"
            onClick={() => this.setState({ sideBarWidth: "0" })}
          />
          {this.state.recipeDetails}

          <div className="ingredient-list">
            <h3>Ingredients List:</h3>
            {this.state.apiAllIngredients.map(ingredient => (
              <button
                type="text"
                disabled
                className="matching-ingredient"
                key={uuid.v4()}
              >
                {ingredient}
              </button>
            ))}
          </div>

          {this.state.recipeSteps.length > 0 ? (
            this.state.recipeSteps.map(recipe => {
              return (
                <p
                  className="instruction-steps"
                  key={uuid.v4()}
                >{`${recipe.number} ${recipe.step}`}</p>
              );
            })
          ) : (
            <h2 className="no-instructions">
              Sorry, no instructions for this recipe
            </h2>
          )}
        </aside>
      </React.Fragment>
    );
  }
}

export default Favorite;
