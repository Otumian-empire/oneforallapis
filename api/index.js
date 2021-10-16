const router = require("express").Router();

router.use("/thecatsapi", require("./thecatapi").router);
router.use("/thejokesapi", require("./thejokeapi").router);
router.use("/themealdbapi", require("./themealdbapi").router);
router.use("/thenewsapi", require("./thenewsapi").router);
router.use("/thenumbersapi", require("./thenumbersapi").router);

module.exports = { router };
