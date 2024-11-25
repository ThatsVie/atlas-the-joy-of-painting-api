const express = require("express");
const router = express.Router();
const { getAllEpisodes } = require("../controllers/episodesController");

// Route for fetching all episodes with filters
router.get("/", getAllEpisodes);

module.exports = router;
