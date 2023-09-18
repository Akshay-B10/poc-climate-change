const { Router } = require("express");

const router = Router();

const climateController = require("../controllers/climate");

router.post("/add-data", climateController.addClimateData);

router.get("/get-all", climateController.getAll);

router.get("/get-by-area", climateController.getByArea);

router.get("/get-by-climate-and-area", climateController.getByClimateAndArea);

router.post("/climate-change-analysis", climateController.climateChangeAnalysis);

module.exports = router;