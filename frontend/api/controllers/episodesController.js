const Episode = require('../models/Episode');

// Fetch all episodes or filter by query
const getAllEpisodes = async (req, res) => {
    try {
        const query = {};

        // Filter by years
        if (req.query.years) {
            const yearsArray = req.query.years.split(',').map(Number); // Parse years as numbers
            query.year = { $in: yearsArray }; // Use the year column
        }

        // Filter by months
        if (req.query.months) {
            const monthsArray = req.query.months.split(',');
            query.month = { $in: monthsArray.map((month) => new RegExp(`^${month}$`, 'i')) };
        }

        // Filter by subjects
        if (req.query.subjects) {
            const subjectsArray = req.query.subjects.split(',');
            query.subjects = { $all: subjectsArray };
        }

        // Filter by colors
        if (req.query.colors) {
            const colorsArray = req.query.colors.split(',');
            query.colors = { $all: colorsArray };
        }

        // Filter by season
        if (req.query.season) {
            query.season = parseInt(req.query.season, 10);
        }

        console.log('Final Query:', JSON.stringify(query, null, 2)); // Log the constructed query

        const episodes = await Episode.find(query)
            .select('title season episode_number air_date year month colors subjects image_link youtube_link')
            .sort({ season: 1, episode_number: 1 });

        res.json(episodes);
    } catch (err) {
        console.error('Error in getAllEpisodes:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllEpisodes };
