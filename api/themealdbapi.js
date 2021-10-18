const axios = require("axios").default;
const router = require("express").Router();

// Lookup a single random meal
// www.themealdb.com/api/json/v1/1/random.php
/* sample response obejct
{
  "meals": [
    {
      "idMeal": string(integer),
      "strMeal": string,
      "strDrinkAlternate": null,
      "strCategory": string,
      "strArea": string,
      "strInstructions": string,
      "strMealThumb": string(url),
      "strTags": string,
      "strYoutube": string(url),
      "strIngredient1": string,
      "strIngredient2": string,
      "strIngredient3": string,
      "strIngredient4": string,
      ...,
      "strIngredientN": string,
      "strMeasure1": string,
      "strMeasure2": string,
      "strMeasure3": string,
      "strMeasure4": string,
      ...,
      "strMeasureN": string,
    
      "strSource": string(url),
      "strImageSource": null,
      "strCreativeCommonsConfirmed": null,
      "dateModified": null
    }
  ]
}
*/

/* We'd response with;
{
  "idMeal": string(integer),
  "strMeal": string,
  "strCategory": string,
  "strArea": string,
  "strInstructions": string,
  "strMealThumb": string(url),
  "strTags": string,
  "strYoutube": string(url),
  "strSource": string(url),
  "ingredientList":["strIngredientN - strMeasureN", ...]
}
*/

router.get("/", async (req, res) => {
  const URL = "https://www.themealdb.com/api/json/v1/1/random.php";

  try {
    // make axios request and get the first element in the meals object
    let responseBody = await axios.get(URL);
    let meal = responseBody.data.meals[0];

    let {
      idMeal,
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strTags,
      strYoutube,
      strSource,
    } = meal;

    let jsonResonse = {
      idMeal,
      strMeal,
      strCategory,
      strArea,
      strInstructions,
      strMealThumb,
      strTags,
      strYoutube,
      strSource,
    };

    let pos = 1;
    let ingredientList = [];
    while (true) {
      if (meal["strIngredient" + pos].trim().length == 0) {
        break;
      }

      ingredientList.push(
        meal["strIngredient" + pos] + " - " + meal["strMeasure" + pos]
      );

      pos++;
    }

    jsonResonse.ingredientList = ingredientList;

    return res.json(jsonResonse);
  } catch (error) {
    return res.json({ success: false, message: "An error occured" });
  }
});

module.exports = { router };
