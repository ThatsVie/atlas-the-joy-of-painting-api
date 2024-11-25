const Episode = require("../models/Episode");

// Fetch all episodes or filter by query
const getAllEpisodes = async (req, res) => {
  try {
    const query = {};

    // Log the incoming request
    console.log("Received Request with Query Parameters:", req.query);

    // Filter by years
    if (req.query.years) {
      const yearsArray = req.query.years.split(",").map(Number);
      query.year = { $in: yearsArray };
    }

    // Filter by months
    if (req.query.months) {
      const monthsArray = req.query.months.split(",");
      query.month = {
        $in: monthsArray.map((month) => new RegExp(`^${month}$`, "i")),
      };
    }

    // Filter by subjects
    if (req.query.subjects) {
      const subjectsArray = req.query.subjects.split(",");
      query.subjects = { $all: subjectsArray };
    }

    // Filter by colors
    if (req.query.colors) {
      const colorsArray = req.query.colors.split(",");
      query.colors = { $all: colorsArray };
    }

    // Filter by season
    if (req.query.season) {
      query.season = parseInt(req.query.season, 10);
    }

    console.log("Constructed MongoDB Query:", JSON.stringify(query, null, 2));

    // Pagination: Retrieve page and limit from query params
    const page = parseInt(req.query.page, 10) || 1; // Default page is 1
    const limit = parseInt(req.query.limit, 10) || 12; // Default limit is 12 episodes per page
    const skip = (page - 1) * limit; // Skip documents for pagination

    console.time("Query Execution Time");

    console.log(`Pagination - Page: ${page}, Limit: ${limit}, Skip: ${skip}`);

    // Execute the query with pagination
    const episodes = await Episode.find(query)
      .select(
        "title season episode_number air_date year month colors subjects image_link youtube_link",
      )
      .sort({ season: 1, episode_number: 1 })
      .skip(skip) // Skip the appropriate number of documents
      .limit(limit); // Limit the number of results returned

    const totalEpisodes = await Episode.countDocuments(query); // Get the total count of documents matching the query

    console.timeEnd("Query Execution Time");
    console.log("Number of Episodes Found:", episodes.length);

    // Respond with paginated data
    res.status(200).json({
      episodes,
      totalEpisodes,
      currentPage: page,
      totalPages: Math.ceil(totalEpisodes / limit),
    });
  } catch (err) {
    console.error("Error in getAllEpisodes:", err);
    res.status(500).json({
      error:
        "An error occurred while fetching episodes. Please try again later.",
    });
  }
};

module.exports = { getAllEpisodes };
