require("dotenv").config();

const axios = require("axios").default;
const router = require("express").Router();

const API_KEY = process.env.THECATAPI_KEY;

// put API_KEY in the header, headers[“x-api-key”] = "ABC123"
// Get a random Kitty
// https://api.thecatapi.com/v1/images/search
/* 
[
  {
    "breeds": array,
    "id": string,
    "url": string(url),
    "width": integer,
    "height": integer
  }
]
*/
// we'd return the same
router.get("/", async (req, res) => {
  try {
    const URL = "https://api.thecatapi.com/v1/images/search";

    let responseObj = await axios.get(URL, {
      headers: { "x-api-key": API_KEY },
    });

    let data = responseObj.data[0];

    return res.json(data);
  } catch (error) {
    return res.json({
      success: false,
      message: "An error occured",
    });
  }
});
module.exports = { router };
