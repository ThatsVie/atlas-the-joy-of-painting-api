const Episode = require('../models/Episode');

// Fetch all episodes or filter by query
const getAllEpisodes = async (req, res) => {
    try {
        const query = {};

        // Filter by months (OR logic)
        if (req.query.months) {
            const monthsArray = req.query.months.split(',');
            query.month = { $in: monthsArray };
        }

        // Filter by colors (AND logic)
        if (req.query.colors) {
            const colorsArray = req.query.colors.split(',');
            query.colors = { $all: colorsArray };
        }

        // Filter by subjects (AND logic)
        if (req.query.subjects) {
            const subjectsArray = req.query.subjects.split(',');
            query.subjects = { $all: subjectsArray };
        }

        // Fetch episodes sorted by air_date
        const episodes = await Episode.find(query)
            .select('title season episode_number air_date colors subjects image_link youtube_link')
            .sort({ air_date: 1 }); // Sort by air_date in ascending order

        res.json(episodes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllEpisodes };
