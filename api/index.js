const router = require("express").Router();

router.use("/thecatsapi", require("./thecatapi"));
router.use("/thejokesapi", require("./thejokeapi"));
router.use("/themealdbapi", require("./themealdbapi"));
router.use("/themusixmatchapi", require("./themusixmatchapi"));
router.use("/thenewsapi", require("./thenewsapi"));
router.use("/thenumbersapi", require("./thenumbersapi"));
router.use("/thestocknewsapi", require("./thestocknewsapi"));

module.exports = { router };
