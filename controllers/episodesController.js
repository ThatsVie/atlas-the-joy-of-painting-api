const Episode = require('../models/Episode');

const getAllEpisodes = async (req, res) => {
    try {
        const { month, subjects, colors, operator = 'AND' } = req.query;
        const query = {};

        if (month) {
            query.month = month;
        }

        if (subjects) {
            query.subjects = { [operator === 'AND' ? '$all' : '$in']: subjects.split(',') };
        }

        if (colors) {
            query.colors = { [operator === 'AND' ? '$all' : '$in']: colors.split(',') };
        }

        const episodes = await Episode.find(query);
        res.json(episodes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllEpisodes };
