const Episode = require('../models/Episode');

// Fetch all episodes or filter by query
const getAllEpisodes = async (req, res) => {
    try {
        const query = {};
        if (req.query.month) {
            query.months = req.query.month;
        }
        const episodes = await Episode.find(query);
        res.json(episodes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllEpisodes };
