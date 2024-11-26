
<div align="center">


# The Joy of Painting API and SPA

Explore the legacy of Bob Ross and his masterpiece series through an intuitive API and interactive web application.

🌳 "We don't make mistakes, just happy little accidents." 🎨

![localhost_3000_](https://github.com/user-attachments/assets/61a8c694-c376-45b7-937e-c877ade8a97c)

**Live Project:** [The Joy of Painting API and SPA](https://atlas-the-joy-of-painting-api-whkc.vercel.app/)

</div>

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [File Descriptions](#file-descriptions)
4. [Usage Instructions](#usage-instructions)
    - [Viewing Episodes](#viewing-episodes)
    - [Accessing the API](#accessing-the-api)
5. [Process Narrative](#process-narrative)
6. [Live Project](#live-project)
7. [Acknowledgements](#acknowledgements)

---

## Overview
This project celebrates Bob Ross’s *The Joy of Painting* by creating a centralized API and an accompanying Single Page Application (SPA) to explore all 403 episodes of the series. Users can filter episodes by:

- **Year**
- **Month**
- **Subjects**
- **Colors**
- **Season**

The project demonstrates a full-stack implementation, featuring data processing (ETL), backend development, and a user-friendly frontend.

---

## Features

- **ETL Pipeline**: Clean, transform, and load data from multiple CSV sources into MongoDB.
- **RESTful API**: Endpoints support filtering by year, month, subjects, colors, and season.
- **React SPA**: Responsive and interactive interface for exploring episodes.
- **Filter Functionality**:
  - **Year**: Search for episodes by one or more years.
  - **Month**: Filter episodes aired in a specific month.
  - **Subjects**: Discover episodes with specific painted elements.
  - **Colors**: Find episodes using particular paint colors.
  - **Season**: Quickly locate episodes from a specific season.
- **Pagination**: Navigate between pages of results.
- **Responsive Design**: Works across devices for a seamless experience.
- **Quote Carousel**: A dynamic carousel displays inspirational quotes from Bob Ross to immerse users in the spirit of *The Joy of Painting*.

---

## File Descriptions

### `application/`

#### `backend/`
Contains all backend-related logic for the API.

- **controllers/episodesController.js**: Implements the logic for filtering, fetching, and paginating episodes.
- **models/Episode.js**: Defines the schema for episodes in MongoDB using Mongoose.
- **routes/episodes.js**: Sets up API routes for handling requests to `/episodes`.
- **app.js**: Entry point for the backend server; configures routes and middleware.
- **vercel.json**: Configuration file for deploying the backend on Vercel.

#### `public/`
Houses static assets for the frontend.

- Contains icons for various devices.
- **index.html**: Entry point for the React SPA.
- **manifest.json**: Metadata for the web app, including icons and theme settings.
- **robots.txt**: Instructions for web crawlers.

#### `src/`
Contains React app components and services.

- **services/api.js**: Defines the Axios configuration for making API requests.
- **App.js**: Main component handling user interactions and displaying filtered results.
- **App.css, index.css**: Styling files for the React app.
- **index.js**: Entry point for rendering the React application.

### `data-and-scripts/`

#### `scripts/`
Python scripts for ETL processes.

- **clean_data.py**: Cleans and normalizes raw datasets.
- **populate_data.py**: Populates the MongoDB database with transformed data.
- **delete_data.py**: Deletes existing data from the database (used for cleanup).
- **test_connection.py**: Tests database connectivity.

#### `data/`
Contains datasets used during development.

- **clean_data.csv**: Cleaned and consolidated dataset.
- **colors_used.csv**, **episode_dates.txt**, **subject_matter.csv**: Original datasets.

---

## Usage Instructions

### Viewing Episodes

1. **Filters**:
   - **Year**: Select one or more years (e.g., 1983, 1984).
   - **Month**: Filter by month (e.g., January, February).
   - **Subjects**: Find episodes featuring specific elements (e.g., trees, rivers).
   - **Colors**: Search by paint colors used in episodes.
   - **Season**: Use a separate dropdown to filter by season (1–31).

2. **Pagination**:
   - Results are displayed 12 episodes per page.
   - Use **Previous** and **Next** buttons to navigate between pages.

3. **Default View**:
   - No episodes are shown until filters are applied.
   - Clear filters at any time using the **Clear All** button.

---

### Accessing the API
The backend API is accessible at:

[Backend on Vercel](https://atlas-the-joy-of-painting-api.vercel.app/episodes)

#### Example Queries

<details>
<summary>Filtering by Year, Month, Subject, and/or Color</summary>

- **Query episodes from the year 1983 (Page 1, 12 episodes per page):**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?years=1983&page=1&limit=12

- **Query episodes from January 1984:**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?years=1984&months=January

- **Query episodes featuring "TREES" painted in 1993 (Page 1, 12 episodes per page):**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?years=1993&subjects=TREES&page=1&limit=12

- **Query episodes where "Phthalo Green" was used in 1983 (Page 2, 12 episodes per page):**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?years=1983&colors=Phthalo+Green&page=2&limit=12

- **Query episodes aired in February across all years featuring "RIVER" (Page 1, 12 episodes per page):**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?months=February&subjects=RIVER&page=1&limit=12

- **Query episodes from December 1990 that feature "TREE" and use "Sap Green":**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?years=1990&months=December&subjects=TREE&colors=Sap+Green
  
  **Note:** This query will return no results as no episode meets all these criteria.  
  **Response:**  
  
```json
  {
    "episodes": [],
    "totalEpisodes": 0,
    "currentPage": 1,
    "totalPages": 0
  }
```

</details>

<details>
<summary>Filtering by Season (1-31)</summary>

- **Query all episodes from Season 1:**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?season=1

- **Query all episodes from Season 15 (Page 2, 12 episodes per page):**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?season=15&page=2&limit=12  

  **Note:** This query will only return one episode because each season contains exactly 13 episodes. Since pagination is set to display 12 episodes per page, Page 1 will include the first 12 episodes, and Page 2 will display the remaining single episode.  

```json
{
  "episodes": [
    {
      "_id": "674139c76b21f672b5bca975",
      "title": "Peaks of Majesty",
      "season": 15,
      "episode_number": 13,
      "air_date": "1988-07-20T00:00:00.000Z",
      "month": "July",
      "year": 1988,
      "colors": [
        "Alizarin Crimson",
        "Cadmium Yellow",
        "Dark Sienna",
        "Indian Yellow",
        "Midnight Black",
        "Phthalo Blue",
        "Prussian Blue",
        "Sap Green",
        "Titanium White",
        "Van Dyke Brown",
        "Yellow Ochre"
      ],
      "subjects": [
        "CIRRUS",
        "CLOUDS",
        "CONIFER",
        "GRASS",
        "LAKE",
        "MOUNTAIN",
        "MOUNTAINS",
        "TREE",
        "TREES"
      ],
      "image_link": "https://www.twoinchbrush.com/images/painting110.png",
      "youtube_link": "https://www.youtube.com/embed/lTb8DN6G6dE"
    }
  ],
  "totalEpisodes": 13,
  "currentPage": 2,
  "totalPages": 2
}
```

</details>

---

## Process Narrative

1. **ETL Pipeline**:
   - Raw data from three CSV files was cleaned and consolidated into a single dataset (`clean_data.csv`).
   - Python scripts (`clean_data.py`, `populate_data.py`) were used to transform and load the data into MongoDB.

2. **Backend Development**:
   - Built with **Node.js**, **Express**, and **Mongoose**.
   - API supports advanced filtering and pagination.

3. **Frontend Development**:
   - Developed as a **React SPA**.
   - Integrated filters and pagination using Axios and state management.

4. **Deployment**:
   - Both backend and frontend were deployed using **Vercel**.
   - Environment variables were configured for both development and production.
   - Backend deployed at: https://atlas-the-joy-of-painting-api.vercel.app/
   - Frontend deployed at: https://atlas-the-joy-of-painting-api-whkc.vercel.app/


## Live Project
Explore the project: [In Honor of Bob Ross - The Joy of Painting Episodes](https://atlas-the-joy-of-painting-api-whkc.vercel.app/)

## Acknowledgements

Special thanks to **Bob Ross** for inspiring this creative journey.  

Data courtesy of:  
- [FiveThirtyEight](https://github.com/fivethirtyeight/data/blob/master/bob-ross/elements-by-episode.csv)  
- [jwilber](https://github.com/jwilber/Bob_Ross_Paintings/blob/master/data/bob_ross_paintings.csv)  


