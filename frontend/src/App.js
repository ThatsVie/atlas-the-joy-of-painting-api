import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from 'react-select';
import { format } from 'date-fns';
import './App.css';


const App = () => {
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
  try {
      const response = await axios.get('http://localhost:4000/episodes', {
          params: {
              months: selectedMonths.map(option => option.value).join(','),
              colors: selectedColors.map(option => option.value).join(','),
              subjects: selectedSubjects.map(option => option.value).join(','),
          },
      });
      setEpisodes(response.data);
  } catch (error) {
      console.error('Error fetching episodes:', error);
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
        <h1>The Joy of Painting Episodes</h1>
        <form onSubmit={handleSearch}>
            <div>
                <label>Months:</label>
                <Select
                    options={monthsOptions}
                    isMulti
                    value={selectedMonths}
                    onChange={setSelectedMonths}
                />
            </div>
            <div>
                <label>Subjects:</label>
                <Select
                    options={subjectsOptions}
                    isMulti
                    value={selectedSubjects}
                    onChange={setSelectedSubjects}
                />
            </div>
            <div>
                <label>Colors:</label>
                <Select
                    options={colorsOptions}
                    isMulti
                    value={selectedColors}
                    onChange={setSelectedColors}
                />
            </div>
            <div className="form-buttons">
                <button type="submit">Search</button>
                <button type="button" onClick={handleClearAll} className="clear-button">
                    Clear All
                </button>
            </div>
        </form>
        <div className="episodes-list">
            {episodes.length === 0 ? (
                <p>No episodes found matching the selected criteria.</p>
            ) : (
                episodes.map((episode, index) => (
                    <div key={index} className="episode-card">
                        <h2>{episode.title}</h2>
                        <p>(Season {episode.season}, Episode {episode.episode_number})</p>
                        <p><strong>Air Date:</strong> {format(new Date(episode.air_date), 'MMMM dd, yyyy')}</p>
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
                            <strong>Colors:</strong> {episode.colors.join(', ')}
                        </p>
                        <p>
                          <strong>Subjects:</strong> {episode.subjects.map(subject => subject.replace(/_/g, ' ')).join(', ')}
                        </p>

                    </div>
                ))
            )}
        </div>
    </div>
);
};

export default App;