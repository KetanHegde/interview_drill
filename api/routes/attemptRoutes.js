const express = require("express");
const router = express.Router();
const { submitAttempt, getAttempts } = require("../controllers/attemptController");
const isAuthenticated = require("../middleware/authMiddleware");

router.post("/", isAuthenticated, submitAttempt);
router.get("/", isAuthenticated, getAttempts);

module.exports = router;
