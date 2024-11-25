import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "react-select";
import { toZonedTime, format } from "date-fns-tz";
import "./App.css";
import Carousel from "react-bootstrap/Carousel";

const App = () => {
  const [showButton, setShowButton] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const yearOptions = [
    { value: "1983", label: "1983" },
    { value: "1984", label: "1984" },
    { value: "1985", label: "1985" },
    { value: "1986", label: "1986" },
    { value: "1987", label: "1987" },
    { value: "1988", label: "1988" },
    { value: "1989", label: "1989" },
    { value: "1990", label: "1990" },
    { value: "1991", label: "1991" },
    { value: "1992", label: "1992" },
    { value: "1993", label: "1993" },
    { value: "1994", label: "1994" },
  ];

  const monthsOptions = [
    { value: "January", label: "January" },
    { value: "February", label: "February" },
    { value: "March", label: "March" },
    { value: "April", label: "April" },
    { value: "May", label: "May" },
    { value: "June", label: "June" },
    { value: "July", label: "July" },
    { value: "August", label: "August" },
    { value: "September", label: "September" },
    { value: "October", label: "October" },
    { value: "November", label: "November" },
    { value: "December", label: "December" },
  ];

  const colorsOptions = [
    { value: "Alizarin Crimson", label: "Alizarin Crimson" },
    { value: "Black Gesso", label: "Black Gesso" },
    { value: "Bright Red", label: "Bright Red" },
    { value: "Burnt Umber", label: "Burnt Umber" },
    { value: "Cadmium Yellow", label: "Cadmium Yellow" },
    { value: "Dark Sienna", label: "Dark Sienna" },
    { value: "Indian Red", label: "Indian Red" },
    { value: "Indian Yellow", label: "Indian Yellow" },
    { value: "Liquid Black", label: "Liquid Black" },
    { value: "Liquid Clear", label: "Liquid Clear" },
    { value: "Midnight Black", label: "Midnight Black" },
    { value: "Phthalo Blue", label: "Phthalo Blue" },
    { value: "Phthalo Green", label: "Phthalo Green" },
    { value: "Prussian Blue", label: "Prussian Blue" },
    { value: "Sap Green", label: "Sap Green" },
    { value: "Titanium White", label: "Titanium White" },
    { value: "Van Dyke Brown", label: "Van Dyke Brown" },
    { value: "Yellow Ochre", label: "Yellow Ochre" },
  ];

  const subjectsOptions = [
    { value: "APPLE_FRAME", label: "Apple Frame" },
    { value: "AURORA_BOREALIS", label: "Aurora Borealis" },
    { value: "BARN", label: "Barn" },
    { value: "BEACH", label: "Beach" },
    { value: "BOAT", label: "Boat" },
    { value: "BRIDGE", label: "Bridge" },
    { value: "BUILDING", label: "Building" },
    { value: "BUSHES", label: "Bushes" },
    { value: "CABIN", label: "Cabin" },
    { value: "CACTUS", label: "Cactus" },
    { value: "CIRCLE_FRAME", label: "Circle Frame" },
    { value: "CIRRUS", label: "Cirrus" },
    { value: "CLIFF", label: "Cliff" },
    { value: "CLOUDS", label: "Clouds" },
    { value: "CONIFER", label: "Conifer" },
    { value: "CUMULUS", label: "Cumulus" },
    { value: "DECIDUOUS", label: "Deciduous" },
    { value: "DIANE_ANDRE", label: "Diane Andre" },
    { value: "DOCK", label: "Dock" },
    { value: "DOUBLE_OVAL_FRAME", label: "Double Oval Frame" },
    { value: "FARM", label: "Farm" },
    { value: "FENCE", label: "Fence" },
    { value: "FIRE", label: "Fire" },
    { value: "FLORIDA_FRAME", label: "Florida Frame" },
    { value: "FLOWERS", label: "Flowers" },
    { value: "FOG", label: "Fog" },
    { value: "FRAMED", label: "Framed" },
    { value: "GRASS", label: "Grass" },
    { value: "GUEST", label: "Guest" },
    { value: "HALF_CIRCLE_FRAME", label: "Half Circle Frame" },
    { value: "HALF_OVAL_FRAME", label: "Half Oval Frame" },
    { value: "HILLS", label: "Hills" },
    { value: "LAKE", label: "Lake" },
    { value: "LAKES", label: "Lakes" },
    { value: "LIGHTHOUSE", label: "Lighthouse" },
    { value: "MILL", label: "Mill" },
    { value: "MOON", label: "Moon" },
    { value: "MOUNTAIN", label: "Mountain" },
    { value: "MOUNTAINS", label: "Mountains" },
    { value: "NIGHT", label: "Night" },
    { value: "OCEAN", label: "Ocean" },
    { value: "OVAL_FRAME", label: "Oval Frame" },
    { value: "PALM_TREES", label: "Palm Trees" },
    { value: "PATH", label: "Path" },
    { value: "PERSON", label: "Person" },
    { value: "PORTRAIT", label: "Portrait" },
    { value: "RECTANGLE_3D_FRAME", label: "Rectangle 3D Frame" },
    { value: "RECTANGULAR_FRAME", label: "Rectangular Frame" },
    { value: "RIVER", label: "River" },
    { value: "ROCKS", label: "Rocks" },
    { value: "SEASHELL_FRAME", label: "Seashell Frame" },
    { value: "SNOW", label: "Snow" },
    { value: "SNOWY_MOUNTAIN", label: "Snowy Mountain" },
    { value: "SPLIT_FRAME", label: "Split Frame" },
    { value: "STEVE_ROSS", label: "Steve Ross" },
    { value: "STRUCTURE", label: "Structure" },
    { value: "SUN", label: "Sun" },
    { value: "TOMB_FRAME", label: "Tomb Frame" },
    { value: "TREE", label: "Tree" },
    { value: "TREES", label: "Trees" },
    { value: "TRIPLE_FRAME", label: "Triple Frame" },
    { value: "WATERFALL", label: "Waterfall" },
    { value: "WAVES", label: "Waves" },
    { value: "WINDMILL", label: "Windmill" },
    { value: "WINDOW_FRAME", label: "Window Frame" },
    { value: "WINTER", label: "Winter" },
    { value: "WOOD_FRAMED", label: "Wood Framed" },
  ];

  const seasonOptions = [
    { value: 1, label: "Season 1" },
    { value: 2, label: "Season 2" },
    { value: 3, label: "Season 3" },
    { value: 4, label: "Season 4" },
    { value: 5, label: "Season 5" },
    { value: 6, label: "Season 6" },
    { value: 7, label: "Season 7" },
    { value: 8, label: "Season 8" },
    { value: 9, label: "Season 9" },
    { value: 10, label: "Season 10" },
    { value: 11, label: "Season 11" },
    { value: 12, label: "Season 12" },
    { value: 13, label: "Season 13" },
    { value: 14, label: "Season 14" },
    { value: 15, label: "Season 15" },
    { value: 16, label: "Season 16" },
    { value: 17, label: "Season 17" },
    { value: 18, label: "Season 18" },
    { value: 19, label: "Season 19" },
    { value: 20, label: "Season 20" },
    { value: 21, label: "Season 21" },
    { value: 22, label: "Season 22" },
    { value: 23, label: "Season 23" },
    { value: 24, label: "Season 24" },
    { value: 25, label: "Season 25" },
    { value: 26, label: "Season 26" },
    { value: 27, label: "Season 27" },
    { value: 28, label: "Season 28" },
    { value: 29, label: "Season 29" },
    { value: 30, label: "Season 30" },
    { value: 31, label: "Season 31" },
  ];

  // Pagination state variables
  const [page, setPage] = useState(1); // Current page
  const [limit] = useState(12); // Items per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  // Fetch episodes based on filters and pagination
  const fetchEpisodes = async () => {
    setLoading(true);
    try {
      const params = {
        years: selectedYears.map((opt) => opt.value).join(","),
        months: selectedMonths.map((opt) => opt.value).join(","),
        subjects: selectedSubjects.map((opt) => opt.value).join(","),
        colors: selectedColors.map((opt) => opt.value).join(","),
        season: selectedSeason?.value || null,
        page, // Include the current page for pagination
        limit, // Include the limit per page
      };

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/episodes`,
        { params },
      );

      setEpisodes(response.data.episodes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching episodes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true); // Mark as searched
    setPage(1); // Reset to the first page when a new search is initiated
    fetchEpisodes();
  };

  // Search by Season Only
  const handleSearchBySeason = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    setLoading(true);

    if (!selectedSeason) {
      alert("Please select a season to search.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/episodes`,
        {
          params: { season: selectedSeason.value, page, limit },
        },
      );

      setEpisodes(response.data.episodes);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching episodes by season:", error);
      setEpisodes([]); // Ensure no stale data
    } finally {
      setLoading(false);
    }
  };

  // Function to handle clearing all filters
  const handleClearAll = () => {
    setSelectedMonths([]);
    setSelectedSubjects([]);
    setSelectedColors([]);
    setSelectedYears([]);
    setSelectedSeason(null);
    setEpisodes([]);
    setHasSearched(false); // Reset to default message
    setPage(1); // Reset pagination to the first page
    setTotalPages(0); // Ensure pagination disappears
  };

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      {/* Header Section */}
      <header className="page-header">
        <h1>In Honor of Bob Ross - The Joy of Painting Episodes</h1>
        <img
          src="/images/bobrosspug.png"
          alt="Pug Painter"
          className="pug-image"
        />
        <div className="biography-section">
          <p>
            Bob Ross brought joy to countless viewers through his series,
            <strong> The Joy of Painting</strong>. His legacy lives on through
            the lessons of creativity, kindness, and positivity he left behind.
          </p>
          <p>
            This project celebrates Bob Ross and his art by cataloging his
            episodes and providing tools to explore them by year, month,
            subject, colors, and season.
          </p>
        </div>
      </header>

      {/* Carousel Section */}
      <Carousel interval={7000}>
        <Carousel.Item>
          <p>
            “We don’t make mistakes. We just have happy accidents.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “Didn’t you know you had that much power? You can move mountains.
            You can do anything.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>“Make love to the canvas.” - Bob Ross</p>
        </Carousel.Item>
        <Carousel.Item>
          <p>“You need the dark in order to show the light.” - Bob Ross</p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “This is happy place; little squirrels live here and play.” - Bob
            Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “There’s nothing wrong with having a tree as a friend.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “We want happy paintings. Happy paintings. If you want sad things,
            watch the news.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “It’s so important to do something every day that will make you
            happy.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>“You too can paint almighty pictures.” - Bob Ross</p>
        </Carousel.Item>
        <Carousel.Item>
          <p>“No pressure. Just relax and watch it happen.” - Bob Ross</p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “Don’t forget to make all these little things individuals — all of
            them special in their own way.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>“Find freedom on this canvas.” - Bob Ross</p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “Gotta give him a friend. Like I always say, ‘Everyone needs a
            friend.’” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “In painting, you have unlimited power. You have the ability to move
            mountains. You can bend rivers. But when I get home, the only thing
            I have power over is the garbage.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “Don’t forget to tell these special people in your life just how
            special they are to you.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “In nature, dead trees are just as normal as live trees.” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>“Go out on a limb — that’s where the fruit is.” - Bob Ross</p>
        </Carousel.Item>
        <Carousel.Item>
          <p>
            “Isn’t it fantastic that you can change your mind and create all
            these happy things?” - Bob Ross
          </p>
        </Carousel.Item>
        <Carousel.Item>
          <p>“Anytime you learn, you gain.” - Bob Ross</p>
        </Carousel.Item>
      </Carousel>

      {/* Filters Section */}
      <form className="filter-form" onSubmit={handleSearch}>
        <div className="text-center">
          <h2 class="filters-title">Browse The Joy of Painting Episodes</h2>
          <p className="filter-instructions">
            <b>
              Use the filters below to search for episodes by year, month,
              subject, and/or color. Alternatively, use the seasons filter to
              find episodes by season only.
            </b>
          </p>
        </div>

        <div className="filters">
          <div>
            <label htmlFor="year-filter">Year:</label>
            <Select
              id="year-filter"
              options={yearOptions}
              isMulti
              value={selectedYears}
              onChange={setSelectedYears}
              aria-label="Filter by years"
            />
          </div>

          <div>
            <label htmlFor="month-filter">Month:</label>
            <Select
              id="month-filter"
              options={monthsOptions}
              isMulti
              value={selectedMonths}
              onChange={setSelectedMonths}
              aria-label="Filter by months"
            />
          </div>

          <div>
            <label htmlFor="subject-filter">Subjects:</label>
            <Select
              id="subject-filter"
              options={subjectsOptions}
              isMulti
              value={selectedSubjects}
              onChange={setSelectedSubjects}
              aria-label="Filter by subjects"
            />
          </div>

          <div>
            <label htmlFor="color-filter">Colors:</label>
            <Select
              id="color-filter"
              options={colorsOptions}
              isMulti
              value={selectedColors}
              onChange={setSelectedColors}
              aria-label="Filter by colors"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="search-button">
              Search
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="clear-button"
            >
              Clear All
            </button>
          </div>
        </div>
      </form>

      {/* Season Filter */}
      <div className="separator-line"></div>
      <div className="separator">
        <form onSubmit={handleSearchBySeason}>
          <label htmlFor="season-filter">Search by Season Only:</label>

          <div className="select-container">
            <Select
              id="season-filter"
              options={seasonOptions}
              value={selectedSeason}
              onChange={setSelectedSeason}
              aria-label="Filter by seasons"
            />
          </div>

          <div className="form-buttons">
            <button type="submit" className="search-button">
              Search
            </button>
            <button
              type="button"
              className="clear-button"
              onClick={() => {
                setSelectedSeason(null); // Clear the selected season
                setEpisodes([]); // Clear the episodes
              }}
            >
              Clear All
            </button>
          </div>
        </form>
      </div>

      {/* Episodes Section */}
      <div className="episodes-section">
        {hasSearched && episodes.length > 0 && (
          <h2 className="results-heading">Results</h2>
        )}

        {/* Episodes List */}
        <div className="episodes-list">
          {loading ? (
            <div className="loader-container">
              <div className="loader"></div>
              <p>Loading results...</p>
            </div>
          ) : hasSearched && episodes.length === 0 ? (
            <p>No episodes found. Try adjusting the filters.</p>
          ) : !hasSearched ? (
            <p>
              <b>Use the season filter to find episodes by season.</b>
            </p>
          ) : (
            episodes.map((episode, index) => (
              <div key={index} className="episode-card">
                <h2>{episode.title}</h2>
                <p>
                  (Season {episode.season}, Episode {episode.episode_number})
                </p>
                <p>
                  <strong>Air Date:</strong>{" "}
                  {episode.air_date
                    ? format(
                        toZonedTime(new Date(episode.air_date), "UTC"),
                        "MMMM dd, yyyy",
                      )
                    : "Unknown"}
                </p>
                {episode.image_link && (
                  <img
                    src={episode.image_link}
                    alt={`Thumbnail for ${episode.title}`}
                    className="episode-image"
                  />
                )}
                {episode.youtube_link && (
                  <a
                    href={episode.youtube_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="youtube-button"
                  >
                    Watch on YouTube
                  </a>
                )}

                <p>
                  <strong>Colors:</strong> {episode.colors.join(", ")}
                </p>
                <p>
                  <strong>Subjects:</strong>{" "}
                  {episode.subjects
                    .map((subject) =>
                      subject
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase()),
                    )
                    .join(", ")}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {episodes.length > 0 && totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
                fetchEpisodes();
              }
            }}
            disabled={page === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => {
              if (page < totalPages) {
                setPage(page + 1);
                fetchEpisodes();
              }
            }}
            disabled={page === totalPages}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}

      {/* Back to Top Button */}
      {showButton && (
        <div className="back-to-top-container">
          <button
            className="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </button>
        </div>
      )}

      <footer className="page-footer">
        <p>Thank you for stopping by this page!</p>
        <p>Feel free to explore more:</p>
        <ul>
          <li>
            <a
              href="https://github.com/ThatsVie/atlas-the-joy-of-painting-api/blob/main/README.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Project GitHub README
            </a>
          </li>

          <li>
            <a
              href="https://whatdoyouknowaboutlove.com/viepaula/"
              target="_blank"
              rel="noopener noreferrer"
            >
              About the Developer
            </a>
          </li>
        </ul>
        <p>
          “Isn’t it fantastic that you can change your mind and create all these
          happy things?” – Bob Ross
        </p>
      </footer>
    </div>
  );
};

export default App;
