const mongoose = require('mongoose');

const EpisodeSchema = new mongoose.Schema({
    title: { type: String },
    season: { type: Number },
    episode_number: { type: Number },
    colors: { type: String },
    color_ids: { type: String },
    image_links: { type: String },
    youtube_links: { type: String },
    all_colors: { type: String },
    subject_matter: { type: String },
    air_dates: { type: String },
    months: { type: String },
    notes: { type: String },
});

module.exports = mongoose.model('Episode', EpisodeSchema);
