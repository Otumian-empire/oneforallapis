require("dotenv").config();

const axios = require("axios").default;
const router = require("express").Router();

// apiKey required - Via X-Api-Key HTTP header
// X-Api-Key: da4a31e068d840039a89e5a6e375303b
const NEWSAPI_KEY = process.env.NEWSAPI_KEY;
const BASE_URL_EVERYTHING = "https://newsapi.org/v2/everything";

// Domain as qp domain1, domain2, ...
const DOMAINS = [
  "dev.to",
  "stackoverflow.com",
  "w3schools.com",
  "hackernoon.com",
  "codecademy.com",
  "codeavengers.com",
  "freecodecamp.org",
  "codewars.com",
  "python.org",
  "twitter.com",
  "github.com",
  "medium.com",
  "google.com",
  "sciencedaily.com",
  "mit.edu",
];

// Keywords or phrases to search for in the article title and body
// there is `qInTitle` which searches Keywords or phrases to search
// for in the article title only but we will do with just the query

const QUERY_KEYWORDS = [
  "programming",
  "coding",
  "technology",
  "computer science",
  "software",
  "testing",
  "wiki",
  "python",
  "nodejs",
  "javascript",
  "react",
  "reactnative",
  "computer",
  "opensource",
  "security",
  "development",
  "math",
];

// A date and optional time for the oldest article allowed.
// This should be in ISO 8601 format (e.g. 2021-10-18 or 2021-10-18T02:48:18)
// const FROM = new Date();

// sortBy: relevancy, popularity, publishedAt
// const SORT_BY = "relevancy"; // make it local

// pageSize int: The number of results to return per page. default = 100
// set to 10
const PAGE_SIZE = 10;

// page: Use this to page through the results. default = 1
// let page = 1; // use the local version of page
// the total number of request = PAGE_SIZE * page and
// must be less than 100 for dev account

// we do english only for now
// const LANGUAGE = "en";  // make it local

// ################################################################ //
// response body and we'd return the same
/* 
{
  "status": string->ok,
  "totalResults": integer,
  "articles": [
    {
      "source": {
        "id": string|integer|null,
        "name": string
      },
      "author": string,
      "title": string,
      "description": string,
      "url": string(url),
      "urlToImage": string(img-url),
      "publishedAt": string(date),
      "content": string(TEXT),
    },
    ...
  ]
}
*/

const pageMiddleware = (req, _res, next) => {
  try {
    const pageReqQuery = req.query.page;
    if (
      pageReqQuery == undefined ||
      parseInt(pageReqQuery) == NaN ||
      Math.abs(parseInt(pageReqQuery)) > 10
    ) {
      req.query.page = 1;
    }
  } catch (error) {
    req.query.page = 1;
  }

  return next();
};

router.get("/everything", pageMiddleware, async (req, res) => {
  try {
    const LANGUAGE = "en";
    const SORT_BY = "relevancy";

    let page = req.query.page;

    const responseBody = await axios.get(BASE_URL_EVERYTHING, {
      headers: {
        "X-Api-Key": NEWSAPI_KEY,
      },
      params: {
        domains: DOMAINS.join(","),
        sortBy: SORT_BY,
        pageSize: PAGE_SIZE,
        language: LANGUAGE,
        page: page,
        q: QUERY_KEYWORDS,
      },
    });

    return res.json(responseBody.data);
  } catch (error) {
    return res.json({ message: "An error occured" });
  }
});

// This endpoint provides live top and breaking headlines for a country,
//  specific category in a country, single source, or multiple sources.
// You can also search with keywords. Articles are sorted by the earliest
// date published first.
// This endpoint is great for retrieving headlines for use with
// news tickers or similar.
// https://newsapi.org/v2/top-headlines
const BASE_URL_HEADLINE = "https://newsapi.org/v2/top-headlines";

// country - new is from -> us, we can only choose one country
// category - we can only choose one -> technology
// there is sources but we'd skip it 🤒
// there is pageSize and page. We'd use the default pageSize set above
// and make page local
// the q: keywords to search for, here limits the number of output so we'd
// leave it out

router.get("/headlines", pageMiddleware, async (req, res) => {
  try {
    const COUNTRY = "us";
    const CATEGORY = "technology";

    let page = req.query.page;

    const responseBody = await axios.get(BASE_URL_HEADLINE, {
      headers: {
        "X-Api-Key": NEWSAPI_KEY,
      },
      params: {
        country: COUNTRY,
        category: CATEGORY,
        pageSize: PAGE_SIZE,
        page: page,
      },
    });

    return res.json(responseBody.data);
  } catch (error) {
    return res.json({ message: "An error occured" });
  }
});

module.exports = { router };
