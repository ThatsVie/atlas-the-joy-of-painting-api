
<div align="center">

![bobrosspuggiewiggie](https://github.com/user-attachments/assets/5ffd4c1b-1c16-4639-8dda-09fb06ebbe9b)


# ETL: The Joy of Coding
</div>

## Overview
This project explores the ETL (Extract, Transform, Load) process to consolidate data from multiple sources into a centralized database for The Joy of Painting episodes. The goal is to create a database and API that allows users to filter the 403 episodes based on:

- **Month of original broadcast**
- **Subject Matter**
- **Color Palette**

This will enable users to discover episodes aligned with their interests, whether it’s paintings done during a specific month, episodes featuring specific subjects, or those showcasing particular colors.



## Curriculum Instructions

### Project Context
Public broadcasting stations receive numerous requests for information about The Joy of Painting. To meet viewer demand, the station has decided to:

1. Collect data from disparate sources.
2. Organize it into a unified database.
3. Build a front-end for filtering episodes based on the data.

Your task is to design and build the backend database and API to support this functionality.

### Resources
- **Bob Ross Episode Data CSV**: [elements-by-episode.csv](https://github.com/fivethirtyeight/data/blob/master/bob-ross/elements-by-episode.csv)
- **Bob Ross Paint Color Details CSV**: [bob_ross_paintings.csv](https://github.com/jwilber/Bob_Ross_Paintings/blob/master/data/bob_ross_paintings.csv)

## Project Objectives
1. **Data Cleaning and Consolidation**: Transform messy and inconsistent data into an organized format.
2. **Database Design**: Create a relational database to store information about episodes, subjects, and colors.
3. **ETL Pipeline**:
    - **Extract**: Read data from CSV files.
    - **Transform**: Clean, normalize, and merge the data.
    - **Load**: Store the cleaned data into a database.
4. **API Development**: Build a RESTful API to allow filtering episodes by:
    - Month of broadcast.
    - Subject matter.
    - Color palette.

