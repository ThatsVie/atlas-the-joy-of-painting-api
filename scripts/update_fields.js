const mongoose = require('mongoose');
require('dotenv').config();

(async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const episodesCollection = db.collection('episodes');

        // Rename fields to match schema
        await episodesCollection.updateMany({}, [
            { $set: { 
                title: "$Title", 
                season: "$Season", 
                episode_number: "$Episode Number", 
                colors: "$Colors", 
                color_ids: "$Color IDs", 
                image_links: "$Image Links", 
                youtube_links: "$YouTube Links", 
                all_colors: "$All Colors", 
                subject_matter: "$Subject Matter", 
                air_dates: "$Air Dates", 
                months: "$Months", 
                notes: "$Notes" 
            }},
            { $unset: [
                "Title", 
                "Season", 
                "Episode Number", 
                "Colors", 
                "Color IDs", 
                "Image Links", 
                "YouTube Links", 
                "All Colors", 
                "Subject Matter", 
                "Air Dates", 
                "Months", 
                "Notes"
            ]}
        ]);

        console.log('Field names updated successfully');
        mongoose.connection.close();
    } catch (err) {
        console.error('Error updating field names:', err);
    }
})();
