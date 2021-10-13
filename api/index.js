const router = require("express").Router();

router.use("/thecatsapi", require("./thecatapi"));
router.use("/thejokesapi", require("./thejokeapi"));
router.use("/themealdbapi", require("./themealdbapi"));
router.use("/thenewsapi", require("./thenewsapi"));
router.use("/thenumbersapi", require("./thenumbersapi"));

module.exports = { router };
