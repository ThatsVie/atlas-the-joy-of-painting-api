import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { toZonedTime, format } from 'date-fns-tz';
import './App.css';
import Carousel from 'react-bootstrap/Carousel';


const App = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Show button after scrolling 300px
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [episodes, setEpisodes] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const monthsOptions = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' },    
  ];

  const colorsOptions = [
    { value: 'Alizarin Crimson', label: 'Alizarin Crimson' },
    { value: 'Black Gesso', label: 'Black Gesso' },
    { value: 'Bright Red', label: 'Bright Red' },
    { value: 'Burnt Umber', label: 'Burnt Umber' },
    { value: 'Cadmium Yellow', label: 'Cadmium Yellow' },
    { value: 'Dark Sienna', label: 'Dark Sienna' },
    { value: 'Indian Red', label: 'Indian Red' },
    { value: 'Indian Yellow', label: 'Indian Yellow' },
    { value: 'Liquid Black', label: 'Liquid Black' },
    { value: 'Liquid Clear', label: 'Liquid Clear' },
    { value: 'Midnight Black', label: 'Midnight Black' },
    { value: 'Phthalo Blue', label: 'Phthalo Blue' },
    { value: 'Phthalo Green', label: 'Phthalo Green' },
    { value: 'Prussian Blue', label: 'Prussian Blue' },
    { value: 'Sap Green', label: 'Sap Green' },
    { value: 'Titanium White', label: 'Titanium White' },
    { value: 'Van Dyke Brown', label: 'Van Dyke Brown' },
    { value: 'Yellow Ochre', label: 'Yellow Ochre' },
];


const subjectsOptions = [
  { value: 'APPLE_FRAME', label: 'Apple Frame' },
  { value: 'AURORA_BOREALIS', label: 'Aurora Borealis' },
  { value: 'BARN', label: 'Barn' },
  { value: 'BEACH', label: 'Beach' },
  { value: 'BOAT', label: 'Boat' },
  { value: 'BRIDGE', label: 'Bridge' },
  { value: 'BUILDING', label: 'Building' },
  { value: 'BUSHES', label: 'Bushes' },
  { value: 'CABIN', label: 'Cabin' },
  { value: 'CACTUS', label: 'Cactus' },
  { value: 'CIRCLE_FRAME', label: 'Circle Frame' },
  { value: 'CIRRUS', label: 'Cirrus' },
  { value: 'CLIFF', label: 'Cliff' },
  { value: 'CLOUDS', label: 'Clouds' },
  { value: 'CONIFER', label: 'Conifer' },
  { value: 'CUMULUS', label: 'Cumulus' },
  { value: 'DECIDUOUS', label: 'Deciduous' },
  { value: 'DIANE_ANDRE', label: 'Diane Andre' },
  { value: 'DOCK', label: 'Dock' },
  { value: 'DOUBLE_OVAL_FRAME', label: 'Double Oval Frame' },
  { value: 'FARM', label: 'Farm' },
  { value: 'FENCE', label: 'Fence' },
  { value: 'FIRE', label: 'Fire' },
  { value: 'FLORIDA_FRAME', label: 'Florida Frame' },
  { value: 'FLOWERS', label: 'Flowers' },
  { value: 'FOG', label: 'Fog' },
  { value: 'FRAMED', label: 'Framed' },
  { value: 'GRASS', label: 'Grass' },
  { value: 'GUEST', label: 'Guest' },
  { value: 'HALF_CIRCLE_FRAME', label: 'Half Circle Frame' },
  { value: 'HALF_OVAL_FRAME', label: 'Half Oval Frame' },
  { value: 'HILLS', label: 'Hills' },
  { value: 'LAKE', label: 'Lake' },
  { value: 'LAKES', label: 'Lakes' },
  { value: 'LIGHTHOUSE', label: 'Lighthouse' },
  { value: 'MILL', label: 'Mill' },
  { value: 'MOON', label: 'Moon' },
  { value: 'MOUNTAIN', label: 'Mountain' },
  { value: 'MOUNTAINS', label: 'Mountains' },
  { value: 'NIGHT', label: 'Night' },
  { value: 'OCEAN', label: 'Ocean' },
  { value: 'OVAL_FRAME', label: 'Oval Frame' },
  { value: 'PALM_TREES', label: 'Palm Trees' },
  { value: 'PATH', label: 'Path' },
  { value: 'PERSON', label: 'Person' },
  { value: 'PORTRAIT', label: 'Portrait' },
  { value: 'RECTANGLE_3D_FRAME', label: 'Rectangle 3D Frame' },
  { value: 'RECTANGULAR_FRAME', label: 'Rectangular Frame' },
  { value: 'RIVER', label: 'River' },
  { value: 'ROCKS', label: 'Rocks' },
  { value: 'SEASHELL_FRAME', label: 'Seashell Frame' },
  { value: 'SNOW', label: 'Snow' },
  { value: 'SNOWY_MOUNTAIN', label: 'Snowy Mountain' },
  { value: 'SPLIT_FRAME', label: 'Split Frame' },
  { value: 'STEVE_ROSS', label: 'Steve Ross' },
  { value: 'STRUCTURE', label: 'Structure' },
  { value: 'SUN', label: 'Sun' },
  { value: 'TOMB_FRAME', label: 'Tomb Frame' },
  { value: 'TREE', label: 'Tree' },
  { value: 'TREES', label: 'Trees' },
  { value: 'TRIPLE_FRAME', label: 'Triple Frame' },
  { value: 'WATERFALL', label: 'Waterfall' },
  { value: 'WAVES', label: 'Waves' },
  { value: 'WINDMILL', label: 'Windmill' },
  { value: 'WINDOW_FRAME', label: 'Window Frame' },
  { value: 'WINTER', label: 'Winter' },
  { value: 'WOOD_FRAMED', label: 'Wood Framed' }
];


const fetchEpisodes = async () => {
  const months = selectedMonths.map((option) => option.value).join(",");
  const colors = selectedColors.map((option) => option.value).join(",");
  const subjects = selectedSubjects.map((option) => option.value).join(",");

  console.log("Fetch Parameters:", { months, colors, subjects });

  try {
    const response = await axios.get("http://localhost:4000/episodes", {
      params: { months, colors, subjects },
    });
    setEpisodes(response.data);
  } catch (error) {
    console.error("Error fetching episodes:", error);
  }
};

const handleSearch = (e) => {
  e.preventDefault();
  fetchEpisodes();
};

const handleClearAll = () => {
  setSelectedMonths([]);
  setSelectedSubjects([]);
  setSelectedColors([]);
  setEpisodes([]);
};

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
          episodes and providing tools to explore them by themes, colors, and
          more.
        </p>
      </div>
    </header>

   {/* Carousel Section */}
   <Carousel interval={7000}>
  <Carousel.Item>
    <p>“We don’t make mistakes. We just have happy accidents.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Didn’t you know you had that much power? You can move mountains. You can do anything.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Make love to the canvas.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“You need the dark in order to show the light.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“This is happy place; little squirrels live here and play.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“There’s nothing wrong with having a tree as a friend.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“We want happy paintings. Happy paintings. If you want sad things, watch the news.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“It’s so important to do something every day that will make you happy.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“You too can paint almighty pictures.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“No pressure. Just relax and watch it happen.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Don’t forget to make all these little things individuals — all of them special in their own way.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Find freedom on this canvas.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Gotta give him a friend. Like I always say, ‘Everyone needs a friend.’” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“In painting, you have unlimited power. You have the ability to move mountains. You can bend rivers. But when I get home, the only thing I have power over is the garbage.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Don’t forget to tell these special people in your life just how special they are to you.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“In nature, dead trees are just as normal as live trees.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Go out on a limb — that’s where the fruit is.” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Isn’t it fantastic that you can change your mind and create all these happy things?” - Bob Ross</p>
  </Carousel.Item>
  <Carousel.Item>
    <p>“Anytime you learn, you gain.” - Bob Ross</p>
  </Carousel.Item>
</Carousel>


    {/* Filters Section */}
    <form onSubmit={handleSearch}>
    <div className="filters">
      <div>
      <label htmlFor="month-filter">Months:</label>
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
        <button type="submit">Search</button>
        <button type="button" onClick={handleClearAll} className="clear-button">
          Clear All
        </button>
      </div>
      </div>
    </form>

{/* Episodes List Section */}
<div className="episodes-list">
  {episodes.length === 0 && selectedMonths.length === 0 && selectedSubjects.length === 0 && selectedColors.length === 0 ? (
    <p>Please use the filters above to search for episodes by month, subject, and/or color.</p>
  ) : episodes.length === 0 ? (
    <p>No episodes found matching the selected criteria.</p>
  ) : (
    <>
      {episodes.map((episode, index) => (
        <div key={index} className="episode-card">
          <h2>{episode.title}</h2>
          <p>(Season {episode.season}, Episode {episode.episode_number})</p>
          <p>
            <strong>Air Date:</strong>{" "}
            {episode.air_date
              ? format(toZonedTime(new Date(episode.air_date), "UTC"), "MMMM dd, yyyy")
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
            <p>
              <a
                href={episode.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Watch on YouTube
              </a>
            </p>
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
                  .replace(/\b\w/g, (char) => char.toUpperCase())
              )
              .join(", ")}
          </p>
        </div>
      ))}

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
    </>
  )}
</div>

{/* Footer Section */}
<footer className="page-footer">
  <p>Thank you for stopping by this page!</p>
  <p>Feel free to explore more:</p>
  <ul>
    
    <li>
      <a href="https://github.com/ThatsVie/atlas-the-joy-of-painting-api/blob/main/README.md" target="_blank" rel="noopener noreferrer">
        Project GitHub README
      </a>
    </li>
    <li>
      <a href="https://github.com/ThatsVie" target="_blank" rel="noopener noreferrer">
        My GitHub Profile
      </a>
    </li>
    <li>
      <a href="https://whatdoyouknowaboutlove.com/" target="_blank" rel="noopener noreferrer">
        My Passion Project: What Do You Know About Love?
      </a>
    </li>
  </ul>
  <p>“Isn’t it fantastic that you can change your mind and create all these happy things?” – Bob Ross</p>
</footer>
  </div>
  
);

};

export default App;
