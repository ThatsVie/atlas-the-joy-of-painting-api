const express = require('express');
const router = express.Router();
const { getAllEpisodes } = require('../controllers/episodesController');

// GET /episodes - Fetch all episodes or filter by month, color, subject
router.get('/episodes', getAllEpisodes);

module.exports = router;
