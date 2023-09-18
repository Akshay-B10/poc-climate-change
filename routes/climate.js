const { Router } = require("express");

const router = Router();

const climateController = require("../controllers/climate");

router.post("/add-data", climateController.addClimateData);

module.exports = router;