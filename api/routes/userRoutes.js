const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/userController");
const isAuthenticated = require("../middleware/authMiddleware");

router.get("/", isAuthenticated, getMe);

module.exports = router;
