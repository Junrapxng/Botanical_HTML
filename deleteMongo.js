const { MongoClient, ObjectID } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Database Name
const dbName = 'tree1';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function deleteDocumentByIndex(index) {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Select the database
    const database = client.db(dbName);

    // Specify the collection and query
    const collection = database.collection('test');

    // Find the document based on some criteria (replace with your criteria)
    const documentToDelete = await collection.findOne({ /* your criteria here */ });

    if (!documentToDelete) {
      console.log('Document not found.');
      return;
    }
 

    // Delete the found document
    const result = await collection.deleteOne({ _id: new ObjectID(documentToDelete._id) });

    // Output the result
    console.log(`${result.deletedCount} document deleted.`);
  } finally {
    // Close the MongoDB client
    await client.close();
  }
}

// Call the function to delete the document by index
deleteDocumentByIndex(0); // Replace 0 with your specific index or criteria
