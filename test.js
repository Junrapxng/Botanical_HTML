const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');

const uri = 'mongodb://localhost:27017'; // Update with your MongoDB connection string
const databaseName = 'tree1';
const collectionName = 'pic_animal';
const jsonFilePath = '/home/botanical/Downloads/botanical/DB/violet/tree1.pic_animal.json';

async function importData() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(databaseName);
    const collection = database.collection(collectionName);

    // Read the JSON file
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // Transform _id field to use ObjectId
    const transformedData = jsonData.map(doc => {
      if (doc._id && doc._id.$oid) {
        doc._id = new ObjectId(doc._id.$oid);
      }
      return doc;
    });

    // Insert the data into the collection
    const result = await collection.insertMany(transformedData);

    console.log(`Successfully imported ${result.insertedCount} documents into the '${collectionName}' collection.`);
  } finally {
    await client.close();
  }
}

importData();
