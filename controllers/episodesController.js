const Episode = require('../models/Episode');

// Fetch all episodes or filter by query
const getAllEpisodes = async (req, res) => {
    try {
        const query = {};
        if (req.query.month) {
            query.month = req.query.month;
        }
        if (req.query.color) {
            query.colors = req.query.color; // Allow filtering by color
        }
        if (req.query.subject) {
            query.subjects = req.query.subject; // Allow filtering by subject
        }
        const episodes = await Episode.find(query);
        res.json(episodes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllEpisodes };
