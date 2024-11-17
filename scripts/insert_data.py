import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
MONGODB_URI = os.getenv("MONGODB_URI")
client = MongoClient(MONGODB_URI)
db = client["joy_of_painting"]

# Insert example data
episodes = db["episodes"]
episodes.insert_one({"title": "Mountain Retreat", "season": 1, "episode": 1})

print("Data inserted successfully!")
