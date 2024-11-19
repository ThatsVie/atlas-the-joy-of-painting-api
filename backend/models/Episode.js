const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    season: { type: Number, required: true },
    episode_number: { type: Number, required: true },
    air_date: { type: Date, required: true },
    month: { type: String, required: true },
    colors: [{ type: String }],
    subjects: [{ type: String }],
    image_link: { type: String, required: true },
    youtube_link: { type: String, required: true },
    notes: { type: String, default: null }
}, { collection: 'episodes' });


module.exports = mongoose.model('Episode', EpisodeSchema);
