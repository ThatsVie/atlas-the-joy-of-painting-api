import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Connect to MongoDB
MONGODB_URI = os.getenv("MONGODB_URI")
if not MONGODB_URI:
    raise ValueError("MONGODB_URI not found in .env file")

client = MongoClient(MONGODB_URI)
db = client["joy_of_painting"]

# Delete all documents in the 'episodes' collection
result = db["episodes"].delete_many({})
print(f"Deleted {result.deleted_count} documents from the 'episodes' collection.")

# Close the connection
client.close()
