const express = require("express");
const router = express.Router();
const { listDrills, getDrill } = require("../controllers/drillController");

router.get("/", listDrills);
router.get("/:id", getDrill);

module.exports = router;
