import React, { Component } from "react";
import uuid from "uuid";
import "./Home.css";

class Home extends Component {
  state = {
    apiKey0: "3e8c96b394444c7cae9f0e5f7ac46b55",
    apiKey: "90e43a593f254fa8b5e96153f5473dfc",
    ingredient: "",
    ingredientList: [],
    apiReturnedRecipes: [],
    apiUsableRecipes: "",
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

  // This fires as user enters ingredients into input bar
  // It populates state.ingredient with a value from the controlled form input
  handleIngredientInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
        .toLowerCase()
        .trim()
        .replace(/ [^a-zA-Z]/g, "")
    });
  };

  // This fires upon user pressing 'Add' button on input bar
  // It adds state.ingredient to state.ingredientList, and resets state.ingredient to ""
  handleIngredientSubmit = event => {
    event.preventDefault();
    this.setState({
      ingredientList: [
        ...new Set([...this.state.ingredientList, this.state.ingredient])
      ],
      ingredient: ""
    });
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
  // The API will return with recipes data which is stored in state.apiReturnedRecipes
  // The array of recipes in state.apiReturnedRecipes are formatted into divs (depending on whether the entered ingredients are a subset of state.ingredientList) and saved to state.apiUsableRecipes
  // Clicking on the images will fire getRecipeDetails(), passing in the id if the recipe
  findRecipe = event => {
    let needToGoShopping = () => {
      this.setState({ isMissingIngredients: true });
    };

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

        // const apiDetails = apiData.map(data =>
        const apiUsableRecipes = this.state.apiReturnedRecipes.map(data =>
          data.missedIngredientCount === 0 ? (
            <div
              className="recipe-results"
              key={uuid.v4()}
              onClick={() => this.getRecipeDetails(data.id)}
            >
              <h1>{data.title}</h1>
              <img src={data.image} alt={data.title} height="231" width="312" />
            </div>
          ) : (
            <div
              className="recipe-results"
              key={uuid.v4()}
              onClick={() => this.getRecipeDetails(data.id)}
            >
              <h1>{data.title}</h1>
              <h2>Missing Ingredients : {data.missedIngredientCount}</h2>
              {this.state.isMissingInstructions && (
                <h2>Missing Instructions</h2>
              )}
              <img src={data.image} alt={data.title} height="231" width="312" />
              {needToGoShopping()}
            </div>
          )
        );
        this.setState({ apiUsableRecipes: apiUsableRecipes });
      })
      .catch(err => console.error(err));
  };

  // Fired by clicking an image from the usable recipes already rendered
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
    return (
      <React.Fragment>
        <main className="main">
          <header>
            <button onClick={this.handleLogout}>Log Out</button>
          </header>

          <section className="ingredients">
            <form autoComplete="off" onSubmit={this.handleIngredientSubmit}>
              <input
                autoComplete="off"
                className="ingredient-search"
                type="text"
                placeholder="Enter ingredient ..."
                name="ingredient"
                value={this.state.ingredient}
                onChange={this.handleIngredientInputChange}
              />
              <button className="add">Add</button>
            </form>
            {this.state.ingredientList.length > 0 && (
              <div className="ingredient-box">
                {this.renderIngredient()}
                <a className="search" onClick={event => this.findRecipe(event)}>
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
            {this.state.apiUsableRecipes}
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
