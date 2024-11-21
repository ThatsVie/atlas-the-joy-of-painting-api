import pandas as pd
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# MongoDB connection
MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("MONGODB_URI not found in .env file")

client = MongoClient(MONGODB_URI)
db = client["joy_of_painting"]
collection = db["episodes"]

# Load cleaned data
clean_data_file = "data/clean_data.csv"
data = pd.read_csv(clean_data_file)

# Adjust data format for MongoDB insertion
def format_record(record):
    record["colors"] = record["colors"].split(", ") if isinstance(record["colors"], str) else []
    record["subjects"] = record["subjects"].split(", ") if isinstance(record["subjects"], str) else []
    record["notes"] = record["notes"] if pd.notna(record["notes"]) else None
    return record


# Convert DataFrame to list of dictionaries
data_records = data.to_dict(orient="records")
formatted_records = [format_record(record) for record in data_records]

# Insert into MongoDB
result = collection.insert_many(formatted_records)
print(f"Inserted {len(result.inserted_ids)} records into MongoDB.")

client.close()
