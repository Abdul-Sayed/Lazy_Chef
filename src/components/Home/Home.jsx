import React, { Component } from "react";
import uuid from "uuid";
import "./Home.css";

class Home extends Component {
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

  componentDidMount() {
    if (localStorage.token) {
      // fetch("http://localhost:3000/user", {
      fetch("https://lazy-chef-api.herokuapp.com/user", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
        .then(res => res.json())
        .then(data => console.log(data));
    } else {
      this.props.history.push("/login");
    }
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  // This fires as user enters ingredients into input bar
  // It populates state.ingredient with a value from the controlled form input
  handleIngredientInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // This fires upon user pressing 'Add' button on input bar
  // It adds state.ingredient to state.ingredientList, and resets state.ingredient to ""
  // Upon completing those steps, it maps through state.ingredientList and for each ingredient, it removes all extra spaces between words, special characters, and all spaces before and after words
  handleIngredientSubmit = event => {
    event.preventDefault();
    this.setState(
      {
        ingredientList: [
          ...new Set([...this.state.ingredientList, this.state.ingredient])
        ],
        ingredient: ""
      },
      () =>
        this.setState({
          ingredientList: this.state.ingredientList.map(ingredient =>
            ingredient
              .replace(/ +/g, " ")
              .replace(/[&\\/#!,+()|@^`_$=;~%.'":*?<>{}[\-[\]']+/g, "")
              .trim()
          )
        })
    );
  };

  // Render each ingredient in state.ingredientList as a div styled as a button
  // If the ingredient is clicked, delete it by firing deleteIngredient()
  // If the Add button link adjacent to the div is clicked, findRecipe() is fired
  renderIngredient = () => {
    return this.state.ingredientList.map(ingredient => (
      <div
        disabled
        className="ingredient-button pulse"
        key={uuid.v4()}
        onClick={event => this.deleteIngredient(event)}
      >
        {`${ingredient}`}
      </div>
    ));
  };

  // Mutate state.ingredientList so that it doesn't contain the clicked ingredient
  deleteIngredient = event => {
    event.persist();
    console.log(event.target.textContent);
    let filteredIngredients = this.state.ingredientList.filter(
      ingredient => ingredient !== event.target.textContent
    );
    this.setState({ ingredientList: filteredIngredients });
  };

  // Fired when the Add button is clicked
  // This formats the ingredients in state.ingredientList into a string for an API query
  // The API will return with recipes data which is (sorted by # missedIngredients &) stored in state.apiReturnedRecipes
  // The array of recipes in state.apiReturnedRecipes are formatted into divs (depending on whether missedIngredientCount === 0) and saved to state.apiFormattedReturnedRecipes. If ingredients are missing, needToGoShopping() is fired and state.isMissingIngredients is set to true.
  // Clicking on the images will fire getRecipeDetails(), passing in the id of the recipe
  // Clicking on the Favorite Recipe button will fire favoriteRecipe()
  findRecipe = event => {
    event.preventDefault();
    let ingredientsString = "";
    this.state.ingredientList.map(
      ingredient => (ingredientsString += `,+${ingredient}`)
    );

    let queryString = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsString.substring(
      2
    )}&number=50&apiKey=${this.state.apiKey}`;

    fetch(queryString)
      .then(res => res.json())
      .then(fetchedApiData => {
        fetchedApiData.sort(
          (recp1, recp2) =>
            recp1.missedIngredientCount - recp2.missedIngredientCount
        );

        this.setState({ apiReturnedRecipes: fetchedApiData });

        console.log(
          "List of apiReturnedRecipes: ",
          this.state.apiReturnedRecipes
        );

        const apiFormattedReturnedRecipes = this.state.apiReturnedRecipes.map(
          data =>
            data.missedIngredientCount === 0 ? (
              <div
                className="recipe-results"
                key={uuid.v4()}
                onClick={() => this.getRecipeDetails(data.id)}
              >
                <h1>{data.title}</h1>
                <img
                  className="recipe-results-img"
                  src={data.image}
                  alt={data.title}
                  height="231"
                  width="312"
                />
                <img
                  className="recipe-results-img-favorite"
                  onClick={event => this.favoriteRecipe(event, data)}
                  src="https://i.ibb.co/YcLQTDJ/favorite-button.png"
                  alt="Favorite"
                  height="200"
                  width="200"
                />
              </div>
            ) : (
              <div
                className="recipe-results"
                key={uuid.v4()}
                onClick={() => this.getRecipeDetails(data.id)}
              >
                <h1>{data.title}</h1>
                {this.state.apiMissedIngredients.length > 0 ? (
                  <h2>
                    Missing Ingredients :{" "}
                    {this.state.apiMissedIngredients.length}
                  </h2>
                ) : (
                  <h2>Missing Ingredients : {data.missedIngredientCount}</h2>
                )}
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
                <img
                  className="recipe-results-img-favorite"
                  onClick={event => this.favoriteRecipe(event, data)}
                  src="https://i.ibb.co/YcLQTDJ/favorite-button.png"
                  alt="Favorite"
                  height="200"
                  width="200"
                />
                {needToGoShopping()}
              </div>
            )
        );
        this.setState({
          apiFormattedReturnedRecipes: apiFormattedReturnedRecipes
        });
      })
      .catch(err => console.error(err));

    let needToGoShopping = () => {
      this.setState({ isMissingIngredients: true });
    };
  };

  // Fired upon user clicking the 'SAVE' images on the apiFormattedReturnedRecipes divs

  favoriteRecipe = (event, recipeData) => {
    event.stopPropagation();
    console.log("Favorited Recipe: ", recipeData);
    alert(`Saved ${recipeData.title}`);
    console.log("props in App.js: ", this.props);
    // this.props.addRecipe(recipeData);

    // fetch("http://localhost:3000/saved_recipes", {
    fetch("https://lazy-chef-api.herokuapp.com/saved_recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        user_id: this.props.userId,
        title: recipeData.title,
        image: recipeData.image,
        recipe_api_id: recipeData.id,
        missing_ingredient_count: recipeData.missedIngredientCount
      })
    })
      .then(response => response.json())
      .then(parsedResponse => {
        console.log("Posted the Saved recipe: ", parsedResponse);
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  // Fired by clicking a div from the rendered usable recipes
  // It fetches specific recipe data and instructions for that recipe
  // It creates a div with the useful recipe information and sets that to state.recipeDetails
  // It sets the returned recipe's instruction steps into state.recipeSteps
  // It finally opens up a sidebar which will contain all these recipe details
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

      console.log("missingIngredients: ", missingIngredients);
      return this.setState({ apiMissedIngredients: missingIngredients });
    });
  };

  render() {
    console.log("props.username: ", this.props.username);
    return (
      <React.Fragment>
        <main className="main">
          <header>
            <button onClick={this.handleLogout}>Log Out</button>
          </header>

          <div className="menu">
            <h1 className="greeting">Welcome {this.props.username}</h1>

            {/* <h1 onClick={() => this.props.history.push("/favorite")}>
              <span className="favorites-link">See Saved Recipes</span>
            </h1> */}

            <h1
              className="favorites-link"
              onClick={() => this.props.history.push("/favorite")}
            >
              See Saved Recipes
            </h1>
          </div>

          <section className="ingredients">
            <form autoComplete="off" onSubmit={this.handleIngredientSubmit}>
              <input
                autoComplete="off"
                className="ingredient-search"
                type="text"
                placeholder="Enter an ingredient ..."
                name="ingredient"
                value={this.state.ingredient}
                onChange={this.handleIngredientInputChange}
              />
              <button className="add">Add</button>
            </form>
            {this.state.ingredientList.length > 0 && (
              <div className="ingredient-box">
                {this.renderIngredient()}
                <a
                  href="/#"
                  className="search"
                  onClick={event => this.findRecipe(event)}
                >
                  Find Recipes
                </a>
              </div>
            )}
          </section>
          <section className="recipe-results-container">
            {/* {this.state.isMissingIngredients ? (
              <h1 className="no-results">
                Sorry, You gotta put on some pants n go out shopping!
              </h1>
            ) : null} */}
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
            {this.state.apiMatchingIngredients.map(ingredient => (
              <button
                type="text"
                disabled
                className="matching-ingredient"
                key={uuid.v4()}
              >
                {ingredient}
              </button>
            ))}
            {this.state.apiMissedIngredients.map(ingredient => (
              <button
                type="text"
                disabled
                className="missing-ingredient"
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

export default Home;
