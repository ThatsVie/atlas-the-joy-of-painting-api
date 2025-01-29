
<div align="center">

# The Joy of Painting API and SPA

## 🌐 **[Deployed Application](https://atlas-the-joy-of-painting-api-whkc.vercel.app/)**

Explore the legacy of Bob Ross and his masterpiece series through an intuitive API and interactive web application.

🌳 "We don't make mistakes, just happy little accidents." 🎨

![localhost_3000_](https://github.com/user-attachments/assets/61a8c694-c376-45b7-937e-c877ade8a97c)


</div>

---

## Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Modified UML Class Diagram](#modified-uml-class-diagram)
4. [File Descriptions](#file-descriptions)
5. [Usage Instructions](#usage-instructions)
    - [Viewing Episodes](#viewing-episodes)
    - [Accessing the API](#accessing-the-api)
6. [Process Narrative](#process-narrative)
7. [Acknowledgements](#acknowledgements)
8. [About the Developer](#about-the-developer)

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
 
    ![Search](https://github.com/user-attachments/assets/5949019a-6505-46cd-8d55-a63535e1820d)

- **Pagination**: Navigate between pages of results.
  <div align="center">

    ![pagination](https://github.com/user-attachments/assets/28e012d5-d2f3-4a7e-9b0c-1766c95254a1)
    </div>

- **Quote Carousel**: A dynamic carousel displays inspirational quotes from Bob Ross to immerse users in the spirit of *The Joy of Painting*.
    <div align="center">
    
    ![quote carousel](https://github.com/user-attachments/assets/0114bd7c-634d-41a5-b60c-4e3620289571)


    </div>

- **Formatted Episode Cards**: Each episode is displayed as a beautifully formatted card, showcasing essential details such as the episode title, season, episode number, air date, subjects featured, colors used, and link to the corresponding Youtube video.
    <div align="center">

    ![episodecard](https://github.com/user-attachments/assets/b23478a2-4d9f-49e7-8d17-dcf8d44e30e3)

    </div>

- **Responsive Design**: Works across devices for a seamless experience.

---
## Modified UML Class Diagram

<div align="center">
    
![Modified UML](https://github.com/user-attachments/assets/f0573e5b-6dd4-48c2-b375-47a83f47a6db)

</div>


- **Data Relationships**:
  - The `colors` and `subjects` fields are embedded arrays, meaning they are stored directly within the `episodes` collection. These are not references to other collections, so there are no traditional "many-to-many" relationships.
- **Storage Context**:
  - This structure is optimized for MongoDB, leveraging its ability to handle arrays and nested data without requiring joins as in a relational database.
- **Design Purpose**:
  - The schema is tailored to store metadata about episodes and their paintings efficiently, providing all relevant information in a single document for fast access.

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

#### Example Searches
<details>
<summary>Some possible search combinations</summary>

- **Search for all episodes from the year 1983 (Page 1, 12 episodes per page):**  
![1983](https://github.com/user-attachments/assets/64a5d42b-a6da-4c0f-bd8e-bec831f6537b)

- **Search for episodes from January 1984:**  
![1984January](https://github.com/user-attachments/assets/a8f92f78-4118-4703-a0b9-7e34e86079d6)

- **Search for episodes featuring "TREES" painted in 1993 (Page 1, 12 episodes per page):**
![1993Trees](https://github.com/user-attachments/assets/a0a03ff7-d286-466e-8d98-2bddad4c6483)

- **Search for episodes where "Phthalo Green" was used in 1983 (Page 2):**
![1983PhthaloGreen](https://github.com/user-attachments/assets/7b3ec51f-fca6-45f9-b81d-1b518784369f)

- **Search for episodes aired in February across all years featuring "RIVER" (Page 1, 12 episodes per page):**
![FebruaryRiver](https://github.com/user-attachments/assets/4f3ded2c-40a1-42f1-8b35-d624fa8b9c13)

- **Search for episodes from December 1990 that feature "TREE" and use "Sap Green":**
**Note:** This search will return no results as no episode meets all these criteria.
![noresults](https://github.com/user-attachments/assets/879f4517-3e21-42b1-867a-6716acfe57f5)

- **Search for all episodes from Season 1 (Page 1):**
![Season1Page1](https://github.com/user-attachments/assets/7582636a-38ea-4a95-8974-402b31dc7cd2)

- **Search for all episodes from Season 15 (Page 2):**
![Season15Page2](https://github.com/user-attachments/assets/a2cb7afe-2209-4ade-b22c-feb4607cf347)


</details>


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

- **Query episodes where "Phthalo Green" was used in 1983 (Page 2):**  
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

- **Query all episodes from Season 1 (Page 1):**  
  https://atlas-the-joy-of-painting-api.vercel.app/episodes?season=1

- **Query all episodes from Season 15 (Page 2):**  
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


## Acknowledgements

Special thanks to **Bob Ross** for inspiring this creative journey.  

Data courtesy of:  
- [FiveThirtyEight](https://github.com/fivethirtyeight/data/blob/master/bob-ross/elements-by-episode.csv)  
- [jwilber](https://github.com/jwilber/Bob_Ross_Paintings/blob/master/data/bob_ross_paintings.csv)  

## About the Developer

Hi, I’m Vie! 😊 This project started as a school assignment to create an API, but I decided to run with it 🚀 and turn it into a full-stack application. The front end was optional, but I wanted to challenge myself and bring the project to life 🎨.

Through this journey, I gained valuable experience with MongoDB and Vercel, and I’m incredibly proud of what I’ve accomplished 💪. I’m grateful for the opportunity to combine my love of coding with my admiration for Bob Ross and his ability to find joy in the process 🌈.

“Go out on a limb — that’s where the fruit is.” 🍎 - Bob Ross

With love, 

❤️ Vie ❤️

🌐 Check out more of my work:  
- [GitHub](https://github.com/ThatsVie)  
- [Portfolio](https://whatdoyouknowaboutlove.com/viepaula/)
