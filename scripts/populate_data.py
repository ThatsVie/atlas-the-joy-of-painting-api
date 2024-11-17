import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB connection
client = MongoClient(os.getenv("MONGODB_URI"))
db = client["joy_of_painting"]
collection = db["episodes"]

# Load cleaned data
clean_data_file = "data/clean_data.csv"
data = pd.read_csv(clean_data_file)

# Convert DataFrame to dictionary and insert into MongoDB
data_dict = data.to_dict(orient="records")
collection.insert_many(data_dict)

print(f"Inserted {len(data_dict)} records into MongoDB.")
