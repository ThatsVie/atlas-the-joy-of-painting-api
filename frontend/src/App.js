import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [month, setMonth] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [colors, setColors] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [noResults, setNoResults] = useState(false);

  // Full list of subjects and colors
  const subjectOptions = [
    "APPLE_FRAME", "AURORA_BOREALIS", "BARN", "BEACH", "BOAT", "BRIDGE", "BUILDING", "BUSHES", "CABIN", "CACTUS",
    "CIRCLE_FRAME", "CIRRUS", "CLIFF", "CLOUDS", "CONIFER", "CUMULUS", "DECIDUOUS", "DIANE_ANDRE", "DOCK",
    "DOUBLE_OVAL_FRAME", "FARM", "FENCE", "FIRE", "FLORIDA FRAME", "FLOWERS", "FOG", "FRAMED", "GRASS", "GUEST",
    "HALF_CIRCLE_FRAME", "HALF_OVAL_FRAME", "HILLS", "LAKE", "LAKES", "LIGHTHOUSE", "MILL", "MOON", "MOUNTAIN",
    "MOUNTAINS", "NIGHT", "OCEAN", "OVAL_FRAME", "PALM_TREES", "PATH", "PERSON", "PORTRAIT", "RECTANGLE_3D_FRAME",
    "RECTANGULAR_FRAME", "RIVER", "ROCKS", "SEASHELL_FRAME", "SNOW", "SNOWY_MOUNTAIN", "SPLIT_FRAME", "STEVE_ROSS",
    "STRUCTURE", "SUN", "TOMB_FRAME", "TREE", "TREES", "TRIPLE_FRAME", "WATERFALL", "WAVES", "WINDMILL",
    "WINDOW_FRAME", "WINTER", "WOOD_FRAMED"
  ];

  const colorOptions = [
    "Black Gesso", "Bright Red", "Burnt Umber", "Cadmium Yellow", "Dark Sienna", "Indian Red", "Indian Yellow",
    "Liquid Black", "Liquid Clear", "Midnight Black", "Phthalo Blue", "Phthalo Green", "Prussian Blue", "Sap Green",
    "Titanium White", "Van Dyke Brown", "Yellow Ochre", "Alizarin Crimson"
  ];

  // Fetch episodes based on filters
  const fetchEpisodes = async () => {
    try {
      const response = await axios.get("http://localhost:4000/episodes", {
        params: {
          month,
          subjects: subjects.join(","),
          colors: colors.join(","),
        },
      });

      setEpisodes(response.data);
      setNoResults(response.data.length === 0); // Check if there are no results
    } catch (error) {
      console.error("Error fetching episodes:", error);
    }
  };

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();
    fetchEpisodes();
  };

  // Clear all filters
  const clearFilters = () => {
    setMonth("");
    setSubjects([]);
    setColors([]);
    setEpisodes([]);
    setNoResults(false);
  };

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">The Joy of Painting Episodes</h1>

      {/* Filter Form */}
      <form onSubmit={handleSearch} className="mb-4">
        <div className="row g-3">
          {/* Month Filter */}
          <div className="col-md-4">
            <label htmlFor="month" className="form-label">Month:</label>
            <select
              id="month"
              className="form-select"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">All</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* Subjects Filter */}
          <div className="col-md-4">
            <label htmlFor="subjects" className="form-label">Subjects:</label>
            <select
              id="subjects"
              className="form-select"
              multiple
              value={subjects}
              onChange={(e) =>
                setSubjects(Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              {subjectOptions.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          {/* Colors Filter */}
          <div className="col-md-4">
            <label htmlFor="colors" className="form-label">Colors:</label>
            <select
              id="colors"
              className="form-select"
              multiple
              value={colors}
              onChange={(e) =>
                setColors(Array.from(e.target.selectedOptions, (option) => option.value))
              }
            >
              {colorOptions.map((color, index) => (
                <option key={index} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-3 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Search</button>
          <button type="button" className="btn btn-secondary" onClick={clearFilters}>
            Clear All
          </button>
        </div>
      </form>

      {/* No Results Message */}
      {noResults && (
        <div className="alert alert-warning text-center">
          No episodes found for the selected filters.
        </div>
      )}

      {/* Episodes List */}
      <div className="row">
        {episodes.map((episode) => (
          <div key={episode._id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={episode.image_link}
                className="card-img-top"
                alt={episode.title}
              />
              <div className="card-body">
                <h5 className="card-title">{episode.title}</h5>
                <p className="card-text">
                  <strong>Season:</strong> {episode.season}<br />
                  <strong>Episode:</strong> {episode.episode_number}<br />
                  <strong>Air Date:</strong> {episode.air_date}<br />
                  <strong>Colors:</strong> {episode.colors.join(", ")}<br />
                  <strong>Subjects:</strong> {episode.subjects.join(", ")}
                </p>
                <a
                  href={episode.youtube_link}
                  className="btn btn-outline-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch Episode
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
