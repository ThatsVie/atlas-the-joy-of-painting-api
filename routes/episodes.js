const express = require('express');
const router = express.Router();
const Episode = require('../models/Episode'); // Import your Episode model

// GET /episodes - Fetch all episodes or filter by month
router.get('/episodes', async (req, res) => {
    try {
        const { month } = req.query; // Extract 'month' query parameter
        const query = month ? { months: month } : {}; // Build query object
        const episodes = await Episode.find(query); // Fetch episodes based on query
        res.json(episodes); // Send JSON response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
