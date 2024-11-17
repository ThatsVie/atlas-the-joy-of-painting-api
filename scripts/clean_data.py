import csv
import pandas as pd

# Paths to raw data files and cleaned-up file
colors_file = 'data/colors_used.csv'
episode_dates_file = 'data/episode_dates.txt'
subject_matter_file = 'data/subject_matter.csv'
clean_data_file = 'data/clean_data.csv'

# Initialize lists to hold data
titles, seasons, episodes, colors, air_dates, notes = [], [], [], [], [], []
image_links, youtube_links, subject_matter = [], [], []

# Process episode_dates.txt
with open(episode_dates_file, 'r') as file:
    for line in file:
        line = line.strip()
        start_idx = line.find('(')
        end_idx = line.find(')')
        if start_idx != -1 and end_idx != -1:
            date = line[start_idx + 1:end_idx]
            formatted_date = pd.to_datetime(date, errors='coerce').strftime('%B %d, %Y')  # Format as "January 11, 1983"
            air_dates.append(formatted_date)
            title = line[:start_idx].strip().replace('"', '')  # Remove extra quotes
            titles.append(title)
            notes.append(line[end_idx + 1:].strip())
        else:
            titles.append(line.strip().replace('"', ''))
            air_dates.append('')
            notes.append('')

# Process subject_matter.csv
with open(subject_matter_file, 'r') as file:
    reader = csv.reader(file)
    header = next(reader)
    subjects = header[2:]  # Extract subject headers
    for row in reader:
        subject_matter.append(', '.join([subjects[i - 2] for i, val in enumerate(row[2:], start=2) if val == '1']))

# Process colors_used.csv
with open(colors_file, 'r') as file:
    reader = csv.reader(file)
    header = next(reader)
    for row in reader:
        seasons.append(row[4])
        episodes.append(row[5])
        colors.append(', '.join([color.strip().replace("\\r\\n", "") for color in row[8].strip("[]").replace("'", "").split(',')]))
        image_links.append(row[2])
        youtube_links.append(row[7])

# Ensure all lists are of the same length
min_length = min(len(titles), len(seasons), len(episodes), len(colors), len(air_dates), len(notes), len(subject_matter), len(image_links), len(youtube_links))
titles, seasons, episodes, colors, air_dates, notes, subject_matter, image_links, youtube_links = [
    lst[:min_length] for lst in [titles, seasons, episodes, colors, air_dates, notes, subject_matter, image_links, youtube_links]
]

# Combine data into a single DataFrame
data = pd.DataFrame({
    'title': titles,
    'season': pd.to_numeric(seasons, errors='coerce'),
    'episode_number': pd.to_numeric(episodes, errors='coerce'),
    'air_date': air_dates,
    'month': [pd.to_datetime(date, errors='coerce').strftime('%B') for date in air_dates],  # Extract month name
    'colors': colors,
    'subjects': subject_matter,
    'image_link': image_links,
    'youtube_link': youtube_links,
    'notes': notes,
})

# Remove duplicates
data.drop_duplicates(subset=['title', 'season', 'episode_number'], inplace=True)

# Save the cleaned data to clean_data.csv
data = data[['title', 'season', 'episode_number', 'air_date', 'month', 'colors', 'subjects', 'image_link', 'youtube_link', 'notes']]  # Reorder columns
data.to_csv(clean_data_file, index=False)
print(f"Cleaned data saved to {clean_data_file} with {len(data)} records.")
