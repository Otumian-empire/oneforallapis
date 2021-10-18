const axios = require("axios").default;
const router = require("express").Router();

// categories = [Any, Programming, Misc, Dark, Pun, Spooky, Christmas]
// default = Any
// this is a req.params
// comma separate multiple categories
// We'd just use [Any, Programming, Dark]

// language - only english

// blacklistFlags = [nsfw, religious, political, racist, sexist, explicit]
// this is query string and is option (when not provided all is used)
// comma separate multiple blacklistFlags
// we'd use all (suppose it a joke)

// type = [single, twopart]
// this is query string and is option (when not provided any type is used)
// comma separate multiple blacklistFlags
// we'd used both for the categories

// amount = numberic value
// by default = 1, or when not provided
// else a collection of jokes is returned, of the specified number
// by default, we'd send 4 as a collection

// safe-mode - use for single jokes

// rsponse object for type = single
/* 
  {
    "error": boolean,
    "category": string,
    "type": string,
    "joke": string,
    "flags": {
      "nsfw": boolean,
      "religious": boolean,
      "political": boolean,
      "racist": boolean,
      "sexist": boolean,
      "explicit": boolean
    },
    "id": integer,
    "safe": boolean,
    "lang": string
  }
*/
// rsponse object for type = twopart
/*
"setup": string,
"delivery": string,
*/

// we will restrict ourselve to only 4 jokes
// i.e, amount = 4 by default
// this is only for category=Any and type=single

/* 
{
  "error": boolean,
  "amount": integer,
  "jokes": [
    {
      "category": string,
      "type":string,
      "joke": string,
      "flags": {
        "nsfw": boolean,
        "religious": boolean,
        "political": boolean,
        "racist": boolean,
        "sexist": boolean,
        "explicit": boolean
      },
      "id": integer,
      "safe": boolean,
      "lang": string,
    },
    {
      "category": "Misc",
      "type": "single",
      "joke": "Schrödinger's cat walks into a bar and doesn't.",
      "flags": {
        "nsfw": false,
        "religious": false,
        "political": false,
        "racist": false,
        "sexist": false,
        "explicit": false
      },
      "id": integer,
      "safe": boolean,
      "lang": string,
    },
    ...
  ]
}
*/

// we'd only send the following in single, twopart or collection
/* 
single, twopart (setup and delivery will combined as joke)
{
  "error": boolean,
  "category": string,
  "joke": string,
}

collection
{
  "error": boolean,
  "jokes": [
    {
      "category": string,
      "joke": string,
    },
    {
      "category": string,
      "joke": string,
    },
    ...
  ]
}
*/

// error object
/* {
  "error": boolean,
  "internalError": boolean,
  "code": integer,
  "message": string,
  "causedBy": [ string ],
  "additionalInfo": string,
  "timestamp": integer
} */

// we'd only accept
/* {
  "error": boolean,
  "message": string,
} */

const deserializeSingleResponse = ({ error, category, joke }) => {
  return { error, category, joke };
};

const deserializeTwopartResponse = ({ error, category, setup, delivery }) => {
  const joke = `${setup} ${delivery}`;
  return { error, category, joke };
};

const deserializeCollectionResponse = ({ error, jokes }) => {
  const newJokes = jokes.map(({ category, joke }) => {
    return { category, joke };
  });
  return { error, joke: newJokes };
};

const deserializeErrorResponse = ({ error, message }) => {
  return { error, message };
};

const makeRequest = async (url, succesCb, errorCb) => {
  try {
    const result = await axios.get(url);

    return !result.data.error ? succesCb(result.data) : errorCb(result.data);
  } catch (error) {
    console.log({ error });
  }
};

router.get("/single/dark", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Dark?type=single";

  makeRequest(URL, deserializeSingleResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/twopart/dark", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Dark?type=twopart";

  makeRequest(URL, deserializeTwopartResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/single/programming", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Programming?type=single";

  makeRequest(URL, deserializeTwopartResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/twopart/programming", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Programming?type=twopart";

  makeRequest(URL, deserializeTwopartResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/single/any/safe-mode", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Any?safe-mode&type=single";

  makeRequest(URL, deserializeSingleResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/twopart/any/safe-mode", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Any?safe-mode&type=twopart";

  makeRequest(URL, deserializeTwopartResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/single/any", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Any?type=single";

  makeRequest(URL, deserializeSingleResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/twopart/any", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Any?type=twopart";

  makeRequest(URL, deserializeTwopartResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/any/collection", (_req, res) => {
  const URL = "https://v2.jokeapi.dev/joke/Any?type=single&amount=4";

  makeRequest(URL, deserializeCollectionResponse, deserializeErrorResponse)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

module.exports = { router };
