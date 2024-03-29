from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Update the URL as needed
db = client["tree"]  # Change to your actual database name
collection = db["login"]  # Change to your actual collection name

# Sample data
data = {
    "username": "admin",
    "password": "1234"
}

# Insert data into MongoDB
result = collection.insert_one(data)

# Print the inserted document ID
print(f"Data inserted with ID: {result.inserted_id}")

# Close the MongoDB connection
client.close()
