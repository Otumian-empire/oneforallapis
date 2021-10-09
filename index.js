const path = require("path");

const express = require("express");
const ejs = require("ejs");
const cors = require("cors");

const web = require("./web").router;
const api = require("./api").router;

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Static files
app.use(express.static(path.join(__dirname, "public")));

// html page
app.use("/", web);

// stand-alone API routes
app.use("/api", api);

app.listen(3000, () => console.log("App runing on localhost:3000/"));
