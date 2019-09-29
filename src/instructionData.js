const instructionData =
  [
    {
      "vegetarian": true,
      "vegan": false,
      "glutenFree": false,
      "dairyFree": false,
      "veryHealthy": false,
      "cheap": false,
      "veryPopular": true,
      "sustainable": false,
      "weightWatcherSmartPoints": 11,
      "gaps": "no",
      "lowFodmap": false,
      "ketogenic": false,
      "whole30": false,
      "preparationMinutes": 10,
      "cookingMinutes": 40,
      "sourceUrl": "http://www.ohsweetbasil.com/2013/05/heirloom-apple-rolls-recipe.html",
      "spoonacularSourceUrl": "https://spoonacular.com/heirloom-apple-rolls-549120",
      "aggregateLikes": 3133,
      "spoonacularScore": 35.0,
      "healthScore": 2.0,
      "creditsText": "Oh Sweet Basil",
      "sourceName": "Oh Sweet Basil",
      "pricePerServing": 31.06,
      "extendedIngredients": [
        {
          "id": 9003,
          "aisle": "Produce",
          "image": "apple.jpg",
          "consitency": "solid",
          "name": "apples",
          "original": "3 cups apples, grated",
          "originalString": "3 cups apples, grated",
          "originalName": "apples, grated",
          "amount": 3.0,
          "unit": "cups",
          "meta": [
            "grated"
          ],
          "metaInformation": [
            "grated"
          ],
          "measures": {
            "us": {
              "amount": 3.0,
              "unitShort": "cups",
              "unitLong": "cups"
            },
            "metric": {
              "amount": 709.764,
              "unitShort": "ml",
              "unitLong": "milliliters"
            }
          }
        },
        {
          "id": 18371,
          "aisle": "Baking",
          "image": "white-powder.jpg",
          "consitency": "solid",
          "name": "baking powder",
          "original": "4 teaspoons baking powder",
          "originalString": "4 teaspoons baking powder",
          "originalName": "baking powder",
          "amount": 4.0,
          "unit": "teaspoons",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 4.0,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            },
            "metric": {
              "amount": 4.0,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            }
          }
        },
        {
          "id": 19334,
          "aisle": "Baking",
          "image": "dark-brown-sugar.png",
          "consitency": "solid",
          "name": "brown sugar",
          "original": "1/4 cup brown sugar",
          "originalString": "1/4 cup brown sugar",
          "originalName": "brown sugar",
          "amount": 0.25,
          "unit": "cup",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 0.25,
              "unitShort": "cups",
              "unitLong": "cups"
            },
            "metric": {
              "amount": 59.147,
              "unitShort": "ml",
              "unitLong": "milliliters"
            }
          }
        },
        {
          "id": 1001,
          "aisle": "Milk, Eggs, Other Dairy",
          "image": "butter-sliced.jpg",
          "consitency": "solid",
          "name": "butter",
          "original": "2 tablespoons melted butter",
          "originalString": "2 tablespoons melted butter",
          "originalName": "melted butter",
          "amount": 2.0,
          "unit": "tablespoons",
          "meta": [
            "melted"
          ],
          "metaInformation": [
            "melted"
          ],
          "measures": {
            "us": {
              "amount": 2.0,
              "unitShort": "Tbsps",
              "unitLong": "Tbsps"
            },
            "metric": {
              "amount": 2.0,
              "unitShort": "Tbsps",
              "unitLong": "Tbsps"
            }
          }
        },
        {
          "id": 2010,
          "aisle": "Spices and Seasonings",
          "image": "cinnamon.jpg",
          "consitency": "solid",
          "name": "cinnamon",
          "original": "2 teaspoons cinnamon",
          "originalString": "2 teaspoons cinnamon",
          "originalName": "cinnamon",
          "amount": 2.0,
          "unit": "teaspoons",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 2.0,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            },
            "metric": {
              "amount": 2.0,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            }
          }
        },
        {
          "id": 20081,
          "aisle": "Baking",
          "image": "flour.png",
          "consitency": "solid",
          "name": "flour",
          "original": "2 cups of flour",
          "originalString": "2 cups of flour",
          "originalName": "flour",
          "amount": 2.0,
          "unit": "cups",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 2.0,
              "unitShort": "cups",
              "unitLong": "cups"
            },
            "metric": {
              "amount": 473.176,
              "unitShort": "ml",
              "unitLong": "milliliters"
            }
          }
        },
        {
          "id": 1077,
          "aisle": "Milk, Eggs, Other Dairy",
          "image": "milk.png",
          "consitency": "liquid",
          "name": "milk",
          "original": "3/4 cup milk",
          "originalString": "3/4 cup milk",
          "originalName": "milk",
          "amount": 0.75,
          "unit": "cup",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 0.75,
              "unitShort": "cups",
              "unitLong": "cups"
            },
            "metric": {
              "amount": 177.441,
              "unitShort": "ml",
              "unitLong": "milliliters"
            }
          }
        },
        {
          "id": 2047,
          "aisle": "Spices and Seasonings",
          "image": "salt.jpg",
          "consitency": "solid",
          "name": "salt",
          "original": "1/2 teaspoon salt",
          "originalString": "1/2 teaspoon salt",
          "originalName": "salt",
          "amount": 0.5,
          "unit": "teaspoon",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 0.5,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            },
            "metric": {
              "amount": 0.5,
              "unitShort": "tsps",
              "unitLong": "teaspoons"
            }
          }
        },
        {
          "id": 19335,
          "aisle": "Baking",
          "image": "sugar-in-bowl.png",
          "consitency": "solid",
          "name": "sugar",
          "original": "1 cup sugar",
          "originalString": "1 cup sugar",
          "originalName": "sugar",
          "amount": 1.0,
          "unit": "cup",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 1.0,
              "unitShort": "cup",
              "unitLong": "cup"
            },
            "metric": {
              "amount": 236.588,
              "unitShort": "ml",
              "unitLong": "milliliters"
            }
          }
        },
        {
          "id": 14412,
          "aisle": "Beverages",
          "image": "water.png",
          "consitency": "liquid",
          "name": "water",
          "original": "2 cups water",
          "originalString": "2 cups water",
          "originalName": "water",
          "amount": 2.0,
          "unit": "cups",
          "meta": [],
          "metaInformation": [],
          "measures": {
            "us": {
              "amount": 2.0,
              "unitShort": "cups",
              "unitLong": "cups"
            },
            "metric": {
              "amount": 473.176,
              "unitShort": "ml",
              "unitLong": "milliliters"
            }
          }
        }
      ],
      "id": 549120,
      "title": "Heirloom Apple Rolls",
      "readyInMinutes": 50,
      "servings": 9,
      "image": "https://spoonacular.com/recipeImages/549120-556x370.jpg",
      "imageType": "jpg",
      "cuisines": [],
      "dishTypes": [
        "side dish"
      ],
      "diets": [
        "lacto ovo vegetarian"
      ],
      "occasions": [],
      "winePairing": {},
      "instructions": "In a large bowl add the flour, baking powder and salt. Whisk to combine thoroughly. Add the shortening or butter in chunks and cut in with a pastry cutter or fork until you reach a sand like texture (small pieces of shortening). Add the milk, and stir to combine into a soft dough.On a floured board, roll the dough in an oblong sheet 1/4 inch thick, and brush with melted butter.Cover dough with 3 cups grated apples, and sprinkle with brown sugar and cinnamon, roll like a jelly roll, cut in slices 1 1/2 inch thick and place in a pan of sugar water. bake 400 about 40 minIn a medium saucepan over medium heat add the water and sugar. Heat through and stir until dissolved.Pour into a 9x13\" baking dish.serve with warm milk or cream in the dish with the rolls.",
      "analyzedInstructions": [
        {
          "name": "",
          "steps": [
            {
              "number": 1,
              "step": "In a large bowl add the flour, baking powder and salt.",
              "ingredients": [
                {
                  "id": 18371,
                  "name": "baking powder",
                  "image": "white-powder.jpg"
                },
                {
                  "id": 20081,
                  "name": "all purpose flour",
                  "image": "flour.png"
                },
                {
                  "id": 2047,
                  "name": "salt",
                  "image": "salt.jpg"
                }
              ],
              "equipment": [
                {
                  "id": 404783,
                  "name": "bowl",
                  "image": "bowl.jpg"
                }
              ]
            },
            {
              "number": 2,
              "step": "Whisk to combine thoroughly.",
              "ingredients": [],
              "equipment": [
                {
                  "id": 404661,
                  "name": "whisk",
                  "image": "whisk.png"
                }
              ]
            },
            {
              "number": 3,
              "step": "Add the shortening or butter in chunks and cut in with a pastry cutter or fork until you reach a sand like texture (small pieces of shortening).",
              "ingredients": [
                {
                  "id": 1001,
                  "name": "butter",
                  "image": "butter-sliced.jpg"
                }
              ],
              "equipment": [
                {
                  "id": 406916,
                  "name": "pastry cutter",
                  "image": "dough-cutter.jpg"
                }
              ]
            },
            {
              "number": 4,
              "step": "Add the milk, and stir to combine into a soft dough.On a floured board, roll the dough in an oblong sheet 1/4 inch thick, and brush with melted butter.Cover dough with 3 cups grated apples, and sprinkle with brown sugar and cinnamon, roll like a jelly roll, cut in slices 1 1/2 inch thick and place in a pan of sugar water. bake 400 about 40 min",
              "ingredients": [
                {
                  "id": 19334,
                  "name": "brown sugar",
                  "image": "dark-brown-sugar.png"
                },
                {
                  "id": 2010,
                  "name": "cinnamon",
                  "image": "cinnamon.jpg"
                },
                {
                  "id": 9003,
                  "name": "apple",
                  "image": "apple.jpg"
                },
                {
                  "id": 1001,
                  "name": "butter",
                  "image": "butter-sliced.jpg"
                },
                {
                  "id": 19335,
                  "name": "sugar",
                  "image": "sugar-in-bowl.png"
                },
                {
                  "id": 14412,
                  "name": "water",
                  "image": "water.png"
                },
                {
                  "id": 1077,
                  "name": "milk",
                  "image": "milk.png"
                }
              ],
              "equipment": [
                {
                  "id": 404645,
                  "name": "frying pan",
                  "image": "pan.png"
                }
              ]
            },
            {
              "number": 5,
              "step": "In a medium saucepan over medium heat add the water and sugar.",
              "ingredients": [
                {
                  "id": 19335,
                  "name": "sugar",
                  "image": "sugar-in-bowl.png"
                },
                {
                  "id": 14412,
                  "name": "water",
                  "image": "water.png"
                }
              ],
              "equipment": [
                {
                  "id": 404669,
                  "name": "sauce pan",
                  "image": "sauce-pan.jpg"
                }
              ]
            },
            {
              "number": 6,
              "step": "Heat through and stir until dissolved.",
              "ingredients": [],
              "equipment": []
            },
            {
              "number": 7,
              "step": "Pour into a 9x13\" baking dish.serve with warm milk or cream in the dish with the rolls.",
              "ingredients": [
                {
                  "id": 1077,
                  "name": "milk",
                  "image": "milk.png"
                }
              ],
              "equipment": [
                {
                  "id": 404646,
                  "name": "baking pan",
                  "image": "roasting-pan.jpg"
                }
              ]
            }
          ]
        }
      ]
    }
  ]


export default instructionData