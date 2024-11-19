const Episode = require('../models/Episode');

// Fetch all episodes or filter by query
const getAllEpisodes = async (req, res) => {
    try {
        const query = {};

        // Filter by months
        if (req.query.months) {
            const monthsArray = req.query.months.split(',');

            // Ensure case-insensitive matching for the 'month' field
            query.month = { $in: monthsArray.map(month => new RegExp(`^${month}$`, 'i')) };

            // Debugging: Log the month filter
            console.log('Months Filter:', monthsArray);
        }

        // Filter by colors (AND logic)
        if (req.query.colors) {
            const colorsArray = req.query.colors.split(',');

            // Match all specified colors
            query.colors = { $all: colorsArray };

            // Debugging: Log colors filter
            console.log('Colors Filter:', colorsArray);
        }

        // Filter by subjects (AND logic)
        if (req.query.subjects) {
            const subjectsArray = req.query.subjects.split(',');

            // Match all specified subjects
            query.subjects = { $all: subjectsArray };

            // Debugging: Log subjects filter
            console.log('Subjects Filter:', subjectsArray);
        }

        // Debugging: Log the final query before database interaction
        console.log('Final Query:', JSON.stringify(query, null, 2));

        // Fetch episodes sorted by season and episode_number
        const episodes = await Episode.find(query)
            .select('title season episode_number air_date month colors subjects image_link youtube_link')
            .sort({ season: 1, episode_number: 1 }); // Sort by season and episode number

        // Debugging: Log the results fetched
        console.log('Episodes Retrieved:', episodes);

        res.json(episodes);
    } catch (err) {
        // Debugging: Log any errors
        console.error('Error in getAllEpisodes:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllEpisodes };
