const express = require('express');
const router = express.Router();
const Episode = require('../models/Episode');

// GET /episodes - Fetch all episodes or filter by month
router.get('/episodes', async (req, res) => {
    try {
        const { month } = req.query; 
        const query = month ? { months: month } : {};
        const episodes = await Episode.find(query);
        res.json(episodes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
