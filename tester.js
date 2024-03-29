const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017'; // Update with your MongoDB connection string
const databaseName = 'tree1';
const collectionName = 'pic_animal'; // Specify the name of your new collection

async function createCollection() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(databaseName);

    // Create a new collection
    await database.createCollection(collectionName);

    console.log(`Collection '${collectionName}' created successfully.`);
  } finally {
    await client.close();
  }
}

createCollection();
