import pymongo

# Establish a connection to your MongoDB server
client = pymongo.MongoClient("mongodb://127.0.0.1:27017/")

# Select your database and collection
db = client["tree"]
collection = db["test"]

# Read the image file as binary data
with open("p2.jpg", "rb") as image_file:
    image_binary = image_file.read()

# Specify the filter criteria to find the documents you want to update
filter_criteria = {"Scientific Name": "Acanthus ebracteatus Vahl"}

# Define the update operation to set the "ลิ้งค์ภาพ" field with the image binary data
update = {"$set": {"ลิ้งค์ภาพ": image_binary}}

# Update the matching documents and capture the result
result = collection.update_many(filter_criteria, update)

# Check if the update was successful
if result.modified_count > 0:
    print(f"Update was successful. {result.modified_count} documents modified.")
else:
    print("No documents were modified. Update may have failed or no matching documents were found.")

# Close the MongoDB connection
client.close()
