const axios = require("axios").default;
const router = require("express").Router();

const URL = "http://numbersapi.com/";

// /2/math => /math/number
router.get("/math/:number", async (req, res) => {
  try {
    let { number } = req.params;

    if (parseInt(number) < 1 || number == undefined) {
      number = "random";
    }

    const newUrl = `${URL}${number}/math?notfound=ceil`;
    const result = await axios.get(newUrl);

    return res.json({ result: result.data });
  } catch (error) {
    return res.json({ error: "error" });
  }
});

// /2/29/date => /date/month/day
router.get("/date/:month/:day", async (req, res) => {
  try {
    let { month, day } = req.params;

    month = month == undefined ? 1 : month;
    day = day == undefined ? 1 : day;

    const newUrl = `${URL}${month}/${day}/date`;
    const result = await axios.get(newUrl);

    return res.json({ result: result.data });
  } catch (error) {
    return res.json({ error: "error" });
  }
});

// /2/year => /year/number
router.get("/year/:number", async (req, res) => {
  try {
    let { number } = req.params;

    if (parseInt(number) < 1 || number == undefined) {
      number = "random";
    }

    const newUrl = `${URL}${number}/year`;
    const result = await axios.get(newUrl);

    return res.json({ result: result.data });
  } catch (error) {
    return res.json({ error: "error" });
  }
});

module.exports = { router };
