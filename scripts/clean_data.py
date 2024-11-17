import csv
import pandas as pd

# Paths to raw data files and cleaned up file
colors_file = 'data/colors_used.csv'
episode_dates_file = 'data/episode_dates.txt'
subject_matter_file = 'data/subject_matter.csv'
clean_data_file = 'data/clean_data.csv'

# Initialize lists to hold data
titles, seasons, episodes, colors, color_ids = [], [], [], [], []
air_dates, months, notes, image_links, youtube_links = [], [], [], [], []
all_colors, all_subjects = [], []
subjects = []

# Helper function to ensure all lists are the same length
def pad_or_trim_lists(*lists):
    min_length = min(len(lst) for lst in lists)
    return [lst[:min_length] for lst in lists]

# Process episode_dates.txt
with open(episode_dates_file, 'r') as file:
    for line in file:
        line = line.strip()
        start_idx = line.find('(')
        end_idx = line.find(')')
        if start_idx != -1 and end_idx != -1:
            date = line[start_idx + 1:end_idx]
            air_dates.append(date)
            months.append(date.split()[0])  # Extract month
            title = line[:start_idx].strip()
            titles.append(title)
            notes.append(line[end_idx + 1:].strip())
        else:
            titles.append(line.strip())
            air_dates.append('')
            months.append('')
            notes.append('')

# Process subject_matter.csv
with open(subject_matter_file, 'r') as file:
    reader = csv.reader(file)
    header = next(reader)
    all_subjects = header[2:]  # Extract subject headers
    for row in reader:
        subjects.append([all_subjects[i - 2] for i, val in enumerate(row[2:], start=2) if val == '1'])

# Process colors_used.csv
with open(colors_file, 'r') as file:
    reader = csv.reader(file)
    header = next(reader)
    all_colors = header[10:]  # Extract color headers
    for row in reader:
        seasons.append(row[4])
        episodes.append(row[5])
        colors.append(row[8])
        image_links.append(row[2])
        youtube_links.append(row[7])
        color_ids.append([all_colors[i - 10] for i, val in enumerate(row[10:], start=10) if val == '1'])

# Ensure all lists are of the same length
titles, seasons, episodes, colors, color_ids, air_dates, months, notes, image_links, youtube_links = pad_or_trim_lists(
    titles, seasons, episodes, colors, color_ids, air_dates, months, notes, image_links, youtube_links
)

# Combine data into a single DataFrame
data = pd.DataFrame({
    'title': titles,
    'season': seasons,
    'episode_number': episodes,
    'colors': colors,
    'color_ids': ['; '.join(color) for color in color_ids],
    'image_links': image_links,
    'youtube_links': youtube_links,
    'all_colors': ['; '.join(all_colors)] * len(titles),
    'subject_matter': ['; '.join(subject) for subject in subjects],
    'air_dates': air_dates,
    'months': months,
    'notes': notes,
})

# Save the cleaned data to clean_data.csv
data.to_csv(clean_data_file, index=False)
print(f"Cleaned data saved to {clean_data_file}")
