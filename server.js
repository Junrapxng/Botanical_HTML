const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const multerCsv = require('multer');
const csv = require('csv-parser');
const app = express();
const port = 40000;
const { noResultHtml, nore, resultHtml } = require('./htmlTemplates');
const { noResultHtmlTwo, resultHtmlTwo, resultHtmlThree } = require('./htmlTemplatesTwo');
const { resultHtmlUp, noResultHtmlup } = require('./htmlTemplatesUp');
const { resultHtmlUptwo, noResultHtmluptwo } = require('./htmlTemplatesUpTwo');
const csvParser = require('csv-parser');

const dbName = 'tree';
const collectionName = 'new3';

const collectionNameTwo = 'new1';
const collectionNameLogin = 'login';
const collectionName_Img = 'pic1'

const collectionName_ImgTwo = 'pic2'
app.use(bodyParser.urlencoded({ extended: false }));
const myDictionary = {};
// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const dotenv = require('dotenv');
dotenv.config();
let mongoClient;

// Set up Multer for handling file uploads
const storageCsv = multerCsv.memoryStorage(); // Store the file in memory
const uploadCsv = multerCsv({ storageCsv: storageCsv });

// Connect to MongoDB server
async function connectToMongo() {
  try {
    mongoClient = await MongoClient.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// Call the connectToMongo function when your application starts
connectToMongo();

// Middleware to handle MongoDB connection
app.use((req, res, next) => {
  req.db = mongoClient.db(dbName);
  next();
});


/////////uploade///////
let imgList = []

const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
        // Specify your folder name
        cb(null, path.join(__dirname, '/public/plantImg'));
    },
    filename: function (req, file, cb) {
        // Use the original file name
        // cb(null, file.originalname);
        // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

        function generateUniqueImageName() {
          const timestamp = new Date().getTime(); // Current timestamp
          const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999
          const uniqueName = `image_${timestamp}_${randomNumber}`;
          return uniqueName;
        }

        const ImgName2 = generateUniqueImageName();
   
        var ImgName = file.fieldname + '-' + Date.now() + '_' + Math.floor(Math.random() * 1000)+ path.extname(file.originalname)

        cb(null, ImgName);
        // var ImgName = file.originalname;
        console.log('888888888888888888', ImgName);
        console.log(typeof(ImgName));

        // file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        
        imgList.push(ImgName);
        
    },
    
   
});


const storagetwo = multer.diskStorage({
  
  destination: function (req, file, cb) {
      // Specify your folder name
      cb(null, path.join(__dirname, '/public/plantImgTwo'));
  },
  filename: function (req, file, cb) {
      // Use the original file name
      // cb(null, file.originalname);
      // callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

      function generateUniqueImageName() {
        const timestamp = new Date().getTime(); // Current timestamp
        const randomNumber = Math.floor(Math.random() * 1000); // Random number between 0 and 999
        const uniqueName = `image_${timestamp}_${randomNumber}`;
        return uniqueName;
      }

      const ImgName2 = generateUniqueImageName();
 
      var ImgName = file.fieldname + '-' + Date.now() + '_' + Math.floor(Math.random() * 1000)+ path.extname(file.originalname)

      cb(null, ImgName);
      // var ImgName = file.originalname;
      console.log('888888888888888888', ImgName);
      console.log(typeof(ImgName));

      // file.fieldname + '-' + Date.now() + path.extname(file.originalname)
      
      imgList.push(ImgName);
      
  },
  
 
});


const upload = multer({ storage: storage });
const uploadtwo = multer({ storage: storagetwo });


// Handle multiple image uploads
app.post('/upload', upload.array('images'), async (req, res, file) => {

  let listImg = []
  var imgNo = 'img '
  for (let key in imgList) {
    // console.log(`${[key]}: ${imgList[key]}`);
    console.log(`${imgNo + [key]}: ${imgList[key]}`);
    // listA.push(`${imgNo+[key]}: ${imgList[key]}`);
    listImg.push(`${imgList[key]}`);
  }

  console.log('List name of image', listImg);

  const Img = { 'img': listImg };
  console.log('------------------', Img);


  const jsonString = JSON.stringify(Img, null, 2);

  const filePath = 'ScienceName.json';
  // Read the JSON file
  fs.readFile(filePath, 'utf-8', async (err, data) => {

    var scienceName_obj = JSON.parse(data);

    if (err) {
      console.error('Error reading JSON file:', err);

    } else {
      const combinedObject = { ...scienceName_obj, ...Img };
      console.log('Data send to mongoDB = ', combinedObject);

      try {
        const client = await MongoClient.connect(process.env.mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Specify the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName_Img);

        // Insert the data into the collection
        const result = await collection.insertOne(combinedObject);
        console.log(result)
        console.log(`Inserted ${result.insertedCount} document into the collection`);
        client.close();

        imgList = [];

      } catch (error) {
        console.error('Failed to retrieve data from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
      }




    }
  });

  imgList = [];

  res.sendStatus(201);
});

app.post('/uploadImage', uploadtwo.single('image'), async (req, res) => {
  const scientificNameI = req.body.scientificNameI;
  const scientificNameII = req.body.scientificNameII;
  const filename = req.file.filename;

  let client;

  try {
      client = new MongoClient(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const db = client.db("tree"); // Use the specified database
      const collection = db.collection('pic2');

      // Update MongoDB collection with the filename
      await collection.updateOne(
        { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII },
          { $push: { img: filename } }
      );

      const valueToDelete = 'haveno.jpg';
        
      await collection.updateMany(
        { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII },
        { $pull: { img:valueToDelete} }
      );

      res.json({ success: true, message: 'Image uploaded and database updated successfully.' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
     console.log(filename)
}});

app.post('/uploadImagetwo', upload.single('image'), async (req, res) => {
  const scientificNameI = req.body.scientificNameI;
  const scientificNameII = req.body.scientificNameII;
  const filename = req.file.filename;
  console.log("ssssssss", scientificNameI, scientificNameII);
  let client;

  try {
    client = new MongoClient(process.env.mongoURI, { useUnifiedTopology: true });
    await client.connect();

    const db = client.db("tree");
    const collection = db.collection('pic1');

    // Update MongoDB collection with the filename
    await collection.updateOne(
      { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII },
      { $push: { img: filename } }
    );

    const valueToDelete = 'haveno.jpg';

    await collection.updateMany(
      { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII },
      { $pull: { img: valueToDelete } }
    );

    res.json({ success: true, message: 'Image uploaded and database updated successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
    console.log(filename);

    if (client) {
      await client.close();
    }
  }
});

app.post('/uploadTwo', uploadtwo.array('images'), async (req, res, file) => {

  let listImg = []
  var imgNo = 'img '
  for (let key in imgList) {
    // console.log(`${[key]}: ${imgList[key]}`);
    console.log(`${imgNo + [key]}: ${imgList[key]}`);
    // listA.push(`${imgNo+[key]}: ${imgList[key]}`);
    listImg.push(`${imgList[key]}`);
  }

  console.log('List name of image', listImg);

  const Img = { 'img': listImg };
  console.log('------------------', Img);


  const jsonString = JSON.stringify(Img, null, 2);

  const filePath = 'ScienceName.json';
  // Read the JSON file
  fs.readFile(filePath, 'utf-8', async (err, data) => {

    var scienceName_obj = JSON.parse(data);

    if (err) {
      console.error('Error reading JSON file:', err);

    } else {
      const combinedObject = { ...scienceName_obj, ...Img };
      console.log('Data send to mongoDB = ', combinedObject);

      try {
        const client = await MongoClient.connect(process.env.mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Specify the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName_ImgTwo);

        // Insert the data into the collection
        const result = await collection.insertOne(combinedObject);
        console.log(`Inserted ${result.insertedCount} document into the collection`);
        client.close();

        imgList = [];

      } catch (error) {
        console.error('Failed to retrieve data from MongoDB:', error);
        res.status(500).json({ error: 'Internal server error' });
      }




    }
  });

  imgList = [];

  res.sendStatus(201);
});




app.post('/submit', async (req, res) => {
  // Handle the data received from the client
  const dataFromClient = req.body;

  console.log('Data received from client:', dataFromClient);

  // Send a response back to the client

  try {
    const client = await MongoClient.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB2222');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the data into the collection
    const result = await collection.insertOne(dataFromClient);
    console.log(result)
    console.log(`Inserted ${result.insertedCount} document into the collection2222`);
    client.close();

    global.success_data = '1';
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  if (global.success_data == '1') {
    console.log('yess');
    res.send(global.success_data);
    global.success_data = '0';
  }

}

);

app.post('/submitTwo', async (req, res) => {
  // Handle the data received from the client
  const dataFromClient = req.body;
  console.log('Data received from client:', dataFromClient);

  // Send a response back to the client

  try {
    const client = await MongoClient.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB2222');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionNameTwo);

    // Insert the data into the collection
    const result = await collection.insertOne(dataFromClient);
    console.log(`Inserted ${result.insertedCount} document into the collection2222`);
    client.close();

    global.success_data = '1';
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  if (global.success_data == '1') {
    console.log('yess');
    res.send(global.success_data);
    global.success_data = '0';
  }

}

);



app.post('/scienceName', async (req, res) => {
  // Handle the data received from the client
  const scienceName_fetch = req.body;
  const scienceName1 = scienceName_fetch.Scientific_Name1;
  const scienceName2 = scienceName_fetch.Scientific_Name2;

  const scienceName= {Scientific_Name:{'I': scienceName1 , 'II': scienceName2}};
  console.log('Data received from client-scienceName:', scienceName);
  res.json({ message: 'Data received successfully!' });

  var jsonString = JSON.stringify(scienceName);

  // Specify the file path
  const filePath = 'ScienceName.json';

  // Write the JSON string to the file
  fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
    if (err) {
      console.error('Error writing JSON file:', err);
    } else {
      console.log('JSON file has been saved:', filePath);
    }
  });

}

);


app.post('/upload_noImg', async (req, res) => {
  let listImg = [];
  const scienceName_obj2 = req.body;
 
  const scienceName1 = scienceName_obj2.Scientific_Name1;
  const scienceName2 = scienceName_obj2.Scientific_Name2;


const scienceName_obj22 = {Scientific_Name:{'I': scienceName1 , 'II': scienceName2}};

  var imgName2 = 'haveno.jpg';


  listImg.push(imgName2);
  const Img2 = { 'img': listImg };
  console.log('------------------', Img2);

  try {
    const client = await MongoClient.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB--img');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection('pic1');

    const combinedObject2 = { ...scienceName_obj22, ...Img2 };
    console.log('Data send to mongoDB = ', combinedObject2);

    // Insert the data into the collection
    const result = await collection.insertOne(combinedObject2);
    console.log(`Inserted ${result.insertedCount} document into the collection--img`);
    client.close();



  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  listImg = [];
  res.sendStatus(201);
});


app.post('/upload_noImg2', async (req, res) => {
  let listImg = [];
  const scienceName_obj2 = req.body;
  const scienceName1 = scienceName_obj2.Scientific_Name1;
  const scienceName2 = scienceName_obj2.Scientific_Name2;

  const scienceName_obj22 = {Scientific_Name:{'I': scienceName1 , 'II': scienceName2}};

  var imgName2 = 'haveno.jpg';

  listImg.push(imgName2);
  const Img2 = { 'img': listImg };
  console.log('------------------', Img2);

  try {
    const client = await MongoClient.connect(process.env.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB--img');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName_ImgTwo);

    const combinedObject2 = { ...scienceName_obj22, ...Img2 };
    console.log('Data send to mongoDB = ', combinedObject2);

    // Insert the data into the collection
    const result = await collection.insertOne(combinedObject2);
    console.log(`Inserted ${result.insertedCount} document into the collection--img`);
    client.close();



  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  listImg = [];
  res.sendStatus(201);
});


app.get('/AddData', (req, res) => {
  res.sendFile(path.join(__dirname, 'AddData.html'));
});

app.get('/AddData2', (req, res) => {
  res.sendFile(path.join(__dirname, 'AddData2.html'));
});

app.get('/csvError', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvError.html'));
});

app.get('/csvError2', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvError2.html'));
});

app.get('/csvColumnError', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvColumnError.html'));
});

app.get('/csvColumnError2', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvColumnError2.html'));
});

app.get('/csvSuccess', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvSuccess.html'));
});

app.get('/csvSuccess2', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvSuccess2.html'));
});

app.get('/csvNoFile', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvNoFile.html'));
});

app.get('/csvNoFile2', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvNoFile2.html'));
});

app.get('/csvGreen', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvGreen.html'));
});

app.get('/csvGreen2', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvGreen2.html'));
});

app.use('/uploads', express.static('plantImg'));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const db = req.db;

  try {
    const collection = db.collection(collectionNameLogin);
    const user = await collection.findOne({ username });

    if (user) {
      // Compare the entered password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.redirect('/adminhome');
      } else {
        // Send a response with a script to show an alert
        res.send('<script>alert("Invalid username or password"); window.location="/login";</script>');
      }
    } else {
      // Send a response with a script to show an alert
      res.send('<script>alert("Invalid username or password"); window.location="/login";</script>');
    }
  } catch (error) {
    console.error('Login error:', error);
    // Send a response with a script to show an alert
    res.status(500).send('<script>alert("Internal server error"); window.location="/login";</script>');
  }
});



app.get('/search1', async (req, res) => {
  const keyword = req.query.keyword;
  const db = req.db;

  try {
    const collection = db.collection(collectionName);
    const query = {
      $or: [
        { 'Scientific name1': { $regex: `^${keyword}`, $options: 'i' } },
        { 'Scientific name2': { $regex: `^${keyword}`, $options: 'i' } },
        { 'Thai Name': { $regex: `^${keyword}`, $options: 'i' } },
      ],
    };
    const data = await collection.find(query).toArray();

    // Iterate through the results and retrieve image data
    for (const record of data) {
      const imageQuery = { 'ScientificName': { $regex: record['Scientific name1'], $options: 'i' } };
      const imageCollection = db.collection('image');
      const imageDoc = await imageCollection.findOne(imageQuery);

      if (imageDoc && imageDoc['Image']) {
        record['Image'] = imageDoc['Image'].toString('base64');
      }
    }

    if (!data || data.length === 0) {
      res.status(404).json({ error: 'Records not found' });
      return;
    }

    res.json(data);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/display', async (req, res) => {
  const inputText = req.body.keyword;
  const db = req.db; // Reuse the MongoDB connection from middleware

  try {

    if (inputText.trim() === ''|| inputText.startsWith('*') || inputText.startsWith('[') ||inputText.startsWith('(') || inputText.startsWith(')') || inputText.startsWith('\\') ) { 
      res.send(noResultHtml([])); 
      return;
    }
    const collection = db.collection(collectionName);

    // Create indexes for the fields you want to search
    collection.createIndex({ 'Name.TH': 1 });
    collection.createIndex({ 'Name.EN': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'CommonName': 1 });
    collection.createIndex({ 'OtherName.TH': 1 });
    collection.createIndex({ 'OtherName.EN': 1 });

    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });

    let query;
    

    // Check if the search input starts with "*" for wildcard search
    if (inputText.startsWith('/')) {
      const searchText = inputText.slice(1);
      query = {
        $or: [
          { 'Name.TH': { $regex: searchText, $options: 'i' } },
          { 'Name.EN': { $regex: searchText, $options: 'i' } },
          { 'ScientificName.I': { $regex: searchText, $options: 'i' } },
          { 'ScientificName.II': { $regex: searchText, $options: 'i' } },
          { 'CommonName': { $regex: searchText, $options: 'i' } },
          { 'OtherName.TH': { $regex: searchText, $options: 'i' } },
          { 'OtherName.EN': { $regex: searchText, $options: 'i' } },
        ],
      };
    } else {
      // Regular search for results starting with the input text
      query = {
        $or: [
          { 'Name.TH': { $regex: `^${inputText}`, $options: 'i' } },
          { 'Name.EN': { $regex: `^${inputText}`, $options: 'i' } },
          { 'ScientificName.I': { $regex: `^${inputText}`, $options: 'i' } },
          { 'ScientificName.II': { $regex: `^${inputText}`, $options: 'i' } },
          { 'CommonName': { $regex: `^${inputText}`, $options: 'i' } },
          { 'OtherName.TH': { $regex: `^${inputText}`, $options: 'i' } },
          { 'OtherName.EN': { $regex: `^${inputText}`, $options: 'i' } },
        ],
      };
    }

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0 ) {
      res.send(noResultHtml(data));
      return;
    }

    // Construct HTML string
    const htmlResponse = resultHtml(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});


app.post('/displayup', async (req, res) => {
  const inputText = req.body.keyword;
  const db = req.db; // Reuse the MongoDB connection from middleware

  try {
    if (inputText.trim() === ''  || inputText.trim() === '*' || inputText.trim() === '[' || inputText.trim() === '(' || inputText.trim() === ')') {    
      res.send(noResultHtmlup([])); 
      return;
    }

    
    const collection = db.collection(collectionName);

    // Create indexes for the fields you want to search
    collection.createIndex({ 'Name.TH': 1 });
    collection.createIndex({ 'Name.EN': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'CommonName': 1 });
    collection.createIndex({ 'OtherName.TH': 1 });
    collection.createIndex({ 'OtherName.EN': 1 });

    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });

    let query;

    // Check if the search input starts with "*" for wildcard search
    if (inputText.startsWith('/')) {
      const searchText = inputText.slice(1);
      query = {
        $or: [
          { 'Name.TH': { $regex: searchText, $options: 'i' } },
          { 'Name.EN': { $regex: searchText, $options: 'i' } },
          { 'ScientificName.I': { $regex: searchText, $options: 'i' } },
          { 'ScientificName.II': { $regex: searchText, $options: 'i' } },
          { 'CommonName': { $regex: searchText, $options: 'i' } },
          { 'OtherName.TH': { $regex: searchText, $options: 'i' } },
          { 'OtherName.EN': { $regex: searchText, $options: 'i' } },
        ],
      };
    } else {
      // Regular search for results starting with the input text
      query = {
        $or: [
          { 'Name.TH': { $regex: `^${inputText}`, $options: 'i' } },
          { 'Name.EN': { $regex: `^${inputText}`, $options: 'i' } },
          { 'ScientificName.I': { $regex: `^${inputText}`, $options: 'i' } },
          { 'ScientificName.II': { $regex: `^${inputText}`, $options: 'i' } },
          { 'CommonName': { $regex: `^${inputText}`, $options: 'i' } },
          { 'OtherName.TH': { $regex: `^${inputText}`, $options: 'i' } },
          { 'OtherName.EN': { $regex: `^${inputText}`, $options: 'i' } },
        ],
      };
    }

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0) {
      res.send(noResultHtmlup(data));
      return;
    }

    // Construct HTML string
    const htmlResponse = resultHtmlUp(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});

app.post('/displayuptwo', async (req, res) => {
  const inputText = req.body.keyword;
  
  try {
    if (inputText.trim() === '' || inputText.trim() === '*' || inputText.trim() === '[' || inputText.trim() === '(' || inputText.trim() === ')') {    
      res.send(noResultHtmluptwo([])); 
      return;
    }
    const db = req.db; // Reuse the MongoDB connection from middleware
    const collection = db.collection(collectionNameTwo);
  
    // Create indexes for the fields you want to search
    collection.createIndex({ 'MFLU': 1 });
    collection.createIndex({ 'FamilyName': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'Collector.TH': 1 });
    collection.createIndex({ 'Collector.EN': 1 });
    collection.createIndex({ 'LocalName.TH': 1 });
    collection.createIndex({ 'LocalName.EN': 1 });
  
    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });
  
    // Build the $or condition dynamically based on the provided input fields
    const orConditions = [];
  
    // Check if the search input starts with "/" for wildcard search
    if (inputText && inputText.startsWith('/')) {
      const searchText = inputText.slice(1);
      orConditions.push(
        { 'MFLU': { $regex: searchText, $options: 'i' } },
        { 'FamilyName': { $regex: searchText, $options: 'i' } },
        { 'ScientificName.I': { $regex: searchText, $options: 'i' } },
        { 'ScientificName.II': { $regex: searchText, $options: 'i' } },
        { 'Collector.TH': { $regex: searchText, $options: 'i' } },
        { 'Collector.EN': { $regex: searchText, $options: 'i' } },
        { 'LocalName.TH': { $regex: searchText, $options: 'i' } },
        { 'LocalName.EN': { $regex: searchText, $options: 'i' } }
      );
    } else {
      // Regular search for results starting with the input text
      orConditions.push(
        { 'MFLU': { $regex: `^${inputText}`, $options: 'i' } },
        { 'FamilyName': { $regex: `^${inputText}`, $options: 'i' } },
        { 'ScientificName.I': { $regex: `^${inputText}`, $options: 'i' } },
        { 'ScientificName.II': { $regex: `^${inputText}`, $options: 'i' } },
        { 'Collector.TH': { $regex: `^${inputText}`, $options: 'i' } },
        { 'Collector.EN': { $regex: `^${inputText}`, $options: 'i' } },
        { 'LocalName.TH': { $regex: `^${inputText}`, $options: 'i' } },
        { 'LocalName.EN': { $regex: `^${inputText}`, $options: 'i' } }
      );
    }
  
    const query = {
      $or: orConditions,
    };

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0) {
      res.send(noResultHtmluptwo(data));
      return;
    }

    const htmlResponse = resultHtmlUptwo(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});


app.post('/displayde', async (req, res) => {
  const inputText = req.body.keyword;
  const db = req.db; // Reuse the MongoDB connection from middleware

  try {
    const collection = db.collection(collectionName);

    // Create indexes for the fields you want to search
    collection.createIndex({ 'Name.TH': 1 });
    collection.createIndex({ 'Name.EN': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'CommonName': 1 });
    collection.createIndex({ 'OtherName.TH': 1 });
    collection.createIndex({ 'OtherName.EN': 1 });

    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });

    const query = {
      $or: [
        { 'Name.TH': { $regex: inputText, $options: 'i' } },
        { 'Name.EN': { $regex: inputText, $options: 'i' } },
        { 'ScientificName.I': { $regex: inputText, $options: 'i' } },
        { 'ScientificName.II': { $regex: inputText, $options: 'i' } },
        { 'CommonName': { $regex: inputText, $options: 'i' } },
        { 'OtherName.TH': { $regex: inputText, $options: 'i' } },
        { 'OtherName.EN': { $regex: inputText, $options: 'i' } },
      ],
    };

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0) {
      res.send(noResultHtmlde(data));
      return;
    }

    // Construct HTML string
    const htmlResponse = resultHtmlde(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});
app.post('/displayOne', async (req, res) => {
  const inputText = req.body.keyword;
  const db = req.db; // Reuse the MongoDB connection from middleware
  console.log(inputText)
  try {
    if (inputText.trim() === '' || inputText.trim() === '*' || inputText.trim() === '[' || inputText.trim() === '(' || inputText.trim() === ')' || inputText.trim() === "\\") { 
      res.send(nore); 
      return;
    }
    const collection = db.collection(collectionName);
    
    // Create indexes for the fields you want to search
    collection.createIndex({ 'Name.TH': 1 });
    collection.createIndex({ 'Name.EN': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'CommonName': 1 });
    collection.createIndex({ 'OtherName.TH': 1 });
    collection.createIndex({ 'OtherName.EN': 1 });

    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });

    let query;
    const escapedInputText = inputText.replace(/^[.*+?^${}()|[\]\\]/g, '\\$&');
    if (escapedInputText.startsWith('/')) {
      const searchText = escapedInputText.slice(1);
      query = {
        $or: [
          { 'Name.TH': { $regex: searchText, $options: 'i' } },
          { 'Name.EN': { $regex: searchText, $options: 'i' } },
          { 'ScientificName.I': { $regex: searchText, $options: 'i' } },
          { 'ScientificName.II': { $regex: searchText, $options: 'i' } },
          { 'CommonName': { $regex: searchText, $options: 'i' } },
          { 'OtherName.TH': { $regex: searchText, $options: 'i' } },
          { 'OtherName.EN': { $regex: searchText, $options: 'i' } },
        ],
      };
    } else {
      // Regular search for results starting with the input text
      query = {
        $or: [
          { 'Name.TH': { $regex: `^${inputText}`, $options: 'i' } },
          { 'Name.EN': { $regex: `^${inputText}`, $options: 'i' } },
          { 'ScientificName.I': { $regex: `^${inputText}`, $options: 'i' } },
          { 'ScientificName.II': { $regex: `^${inputText}`, $options: 'i' } },
          { 'CommonName': { $regex: `^${inputText}`, $options: 'i' } },
          { 'OtherName.TH': { $regex: `^${inputText}`, $options: 'i' } },
          { 'OtherName.EN': { $regex: `^${inputText}`, $options: 'i' } },
        ],
      };
    }

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0  ) {
      res.send(nore);
      return;
    }

    // Construct HTML string
    const htmlResponse = resultHtml(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});



app.post('/displayTwo', async (req, res) => { 
  const inputText = req.body.mfluNo;
  const inputText1 = req.body.scientificName;
  const inputText2 = req.body.familyName;
  const inputText3 = req.body.localName;
  const inputText4 = req.body.collector;

  try {

    if (inputText.trim() === '' && inputText1.trim() === '' && inputText2.trim() === ''&& inputText3.trim() === ''&& inputText4.trim() === '' || inputText.trim() === '*' || inputText1.trim() === '*'  || inputText2.trim() === '*' || inputText3.trim() === '*' || inputText4.trim() === '*' || inputText.trim() === '[' || inputText.trim() === '(' || inputText.trim() === ')'
    || inputText1.trim() === '[' || inputText1.trim() === '(' || inputText1.trim() === ')' || inputText2.trim() === '[' || inputText2.trim() === '(' || inputText2.trim() === ')'  || inputText3.trim() === '[' || inputText3.trim() === '(' || inputText3.trim() === ')' || inputText4.trim() === '[' || inputText4.trim() === '(' || inputText4.trim() === ')' || inputText.trim() === "\\" || inputText1.trim() === "\\"|| inputText2.trim() === "\\"|| inputText3.trim() === "\\"|| inputText4.trim() === "\\") {    
      res.send(noResultHtmlTwo); 
      return;
    }

    const db = req.db; // Reuse the MongoDB connection from middleware
    const collection = db.collection(collectionNameTwo);

    // Create indexes for the fields you want to search
    collection.createIndex({ 'MFLU': 1 });
    collection.createIndex({ 'FamilyName': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'Collector.TH': 1 });
    collection.createIndex({ 'Collector.EN': 1 });
    collection.createIndex({ 'LocalName.TH': 1 });
    collection.createIndex({ 'LocalName.EN': 1 });

    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });

    // Build the $or condition dynamically based on the provided input fields
    const orConditions = [];
    
    // Check if the search input starts with "/" for wildcard search
    if (inputText && inputText.startsWith('/')) {
      const searchText = inputText.slice(1);
      orConditions.push({ 'MFLU': { $regex: searchText, $options: 'i' } });
    } else if (inputText) {
      // Regular search for results starting with the input text
      orConditions.push({ 'MFLU': { $regex: `^${inputText}`, $options: 'i' } });
    }

    if (inputText1) {
      // Search for any occurrence of the input text
      orConditions.push({ 'ScientificName.I': { $regex: inputText1, $options: 'i' } });
    }

    if (inputText2) {
      // Search for results starting with the first letter of the input text
      orConditions.push({ 'FamilyName': { $regex: `^${inputText2.charAt(0)}`, $options: 'i' } });
    }

    if (inputText3) {
      // Search for results starting with the first letter of the input text
      orConditions.push({ 'LocalName.TH': { $regex: `^${inputText3.charAt(0)}`, $options: 'i' } });
    }

    if (inputText4) {
      // Search for any occurrence of the input text in both 'Collector.TH' and 'Collector.EN'
      orConditions.push({ $or: [
        { 'Collector.TH': { $regex: inputText4, $options: 'i' } },
        { 'Collector.EN': { $regex: inputText4, $options: 'i' } },
      ] });
    }

    const query = {
      $or: orConditions,
    };

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0) {
      res.send(noResultHtmlTwo);
      return;
    }

    const htmlResponse = resultHtmlTwo(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});

app.post('/displayTwol', async (req, res) => {
  const inputText = req.body.keyword;

  try {
    if (inputText.trim() === ''|| inputText.startsWith('*') || inputText.startsWith('[') ||inputText.startsWith('(') || inputText.startsWith(')') || inputText.startsWith('\\') ) {    
      res.send(resultHtmlThree([])); 
      return;
    }
    const db = req.db; // Reuse the MongoDB connection from middleware
    const collection = db.collection(collectionNameTwo);
  
    // Create indexes for the fields you want to search
    collection.createIndex({ 'MFLU': 1 });
    collection.createIndex({ 'FamilyName': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'Collector.TH': 1 });
    collection.createIndex({ 'Collector.EN': 1 });
    collection.createIndex({ 'LocalName.TH': 1 });
    collection.createIndex({ 'LocalName.EN': 1 });
  
    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });
  
    // Build the $or condition dynamically based on the provided input fields
    const orConditions = [];
  
    // Check if the search input starts with "/" for wildcard search
    if (inputText && inputText.startsWith('/')) {
      const searchText = inputText.slice(1);
      orConditions.push(
        { 'MFLU': { $regex: searchText, $options: 'i' } },
        { 'FamilyName': { $regex: searchText, $options: 'i' } },
        { 'ScientificName.I': { $regex: searchText, $options: 'i' } },
        { 'ScientificName.II': { $regex: searchText, $options: 'i' } },
        { 'Collector.TH': { $regex: searchText, $options: 'i' } },
        { 'Collector.EN': { $regex: searchText, $options: 'i' } },
        { 'LocalName.TH': { $regex: searchText, $options: 'i' } },
        { 'LocalName.EN': { $regex: searchText, $options: 'i' } }
      );
    } else {
      // Regular search for results starting with the input text
      orConditions.push(
        { 'MFLU': { $regex: `^${inputText}`, $options: 'i' } },
        { 'FamilyName': { $regex: `^${inputText}`, $options: 'i' } },
        { 'ScientificName.I': { $regex: `^${inputText}`, $options: 'i' } },
        { 'ScientificName.II': { $regex: `^${inputText}`, $options: 'i' } },
        { 'Collector.TH': { $regex: `^${inputText}`, $options: 'i' } },
        { 'Collector.EN': { $regex: `^${inputText}`, $options: 'i' } },
        { 'LocalName.TH': { $regex: `^${inputText}`, $options: 'i' } },
        { 'LocalName.EN': { $regex: `^${inputText}`, $options: 'i' } }
      );
    }
  
    const query = {
      $or: orConditions,
    };

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0) {
      res.send(resultHtmlThree(data));
      return;
    }

    const htmlResponse = resultHtmlTwo(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});

app.post('/displayTwo', async (req, res) => {
  const inputText = req.body.mfluNo;
  const inputText1 = req.body.scientificName;
  const inputText2 = req.body.familyName;
  const inputText3 = req.body.localName;
  const inputText4 = req.body.collector;

  try {
    const db = req.db; // Reuse the MongoDB connection from middleware
    const collection = db.collection(collectionNameTwo);

    // Create indexes for the fields you want to search
    collection.createIndex({ 'MFLU': 1 });
    collection.createIndex({ 'FamilyName': 1 });
    collection.createIndex({ 'ScientificName.I': 1 });
    collection.createIndex({ 'ScientificName.II': 1 });
    collection.createIndex({ 'Collector.TH': 1 });
    collection.createIndex({ 'Collector.EN': 1 });
    collection.createIndex({ 'LocalName.TH': 1 });
    collection.createIndex({ 'LocalName.EN': 1 });

    // Use text index for full-text search
    collection.createIndex({ '$**': 'text' });

    // Build the $or condition dynamically based on the provided input fields
    const orConditions = [];

    if (inputText) {
      orConditions.push({ 'MFLU': { $regex: inputText, $options: 'i' } });
    }

    if (inputText1) {
      orConditions.push({ 'ScientificName.I': { $regex: inputText1, $options: 'i' } });
    }

    if (inputText2) {
      orConditions.push({ 'FamilyName': { $regex: inputText2, $options: 'i' } });
    }

    if (inputText3) {
      orConditions.push({ 'LocalName.TH': { $regex: inputText3, $options: 'i' } });
    }

    if (inputText4) {
      orConditions.push({ 'Collector.TH': { $regex: inputText4, $options: 'i' } });
    }

    if (inputText4) {
      orConditions.push({ 'Collector.EN': { $regex: inputText4, $options: 'i' } });
    }

    const query = {
      $or: orConditions,
    };

    const data = await collection.find(query).toArray();

    if (!data || data.length === 0) {
      res.send(noResultHtmlTwo);
      return;
    }

    const htmlResponse = resultHtmlTwo(data);

    // Send HTML response
    res.send(htmlResponse);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).send('<p>Internal server error</p>');
  }
});

app.get('/details', (req, res) => {
  res.sendFile(path.join(__dirname, 'details.html'));
  res.render('details');
});

app.get('/detailsTwo', (req, res) => {
  res.sendFile(path.join(__dirname, 'detailsTwo.html'));
  res.render('detailsTwo');
});

app.get('/api/details', async (req, res) => {
  const id = req.query.id;
  const db = req.db; // Reuse the MongoDB connection from middleware
  const { ObjectId } = require('mongodb');
  console.log(id);

  try {
    const collection = db.collection(collectionName);

    const query = {
      '_id': new ObjectId(id), // Use new keyword to create an instance of ObjectId
    };

    const data = await collection.findOne(query);
    console.log(data);

    if (!data) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }

    const scientificNameI = data['ScientificName']['I'].trim();
    const scientificNameII = data['ScientificName']['II'].trim();


    const imageQuery = {
      $and: [
        { 'Scientific_Name.I': { $regex: new RegExp('^' + escapeRegExp(scientificNameI) + '$', 'i') } },
        { 'Scientific_Name.II': { $regex: new RegExp('^' + escapeRegExp(scientificNameII) + '$', 'i') } },
      ],
    };
    
    // Function to escape special characters in a string for regex
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    


    const imageCollection = db.collection('pic1');
    const imageDocs = await imageCollection.find(imageQuery).toArray();

    // If image documents are found, add them to the record
    if (imageDocs.length > 0) {
      data['Images'] = imageDocs.map(imageDoc => imageDoc['img']);
    }

    res.json(data);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/detailsTwo', async (req, res) => {
  const id = req.query.id;
  const db = req.db; // Reuse the MongoDB connection from middleware
  const { ObjectId } = require('mongodb');

  try {
    const collection = db.collection(collectionNameTwo);

    const query = {
      '_id': new ObjectId(id), // Use new keyword to create an instance of ObjectId
    };

    const data = await collection.findOne(query);
    console.log(data);

    if (!data) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }

    const scientificNameI = data['ScientificName']['I'].trim();
    const scientificNameII = data['ScientificName']['II'].trim();

    const imageQuery = {
      $and: [
        { 'Scientific_Name.I': { $regex: new RegExp('^' + escapeRegExp(scientificNameI) + '$', 'i') } },
        { 'Scientific_Name.II': { $regex: new RegExp('^' + escapeRegExp(scientificNameII) + '$', 'i') } },
      ],
    };
    
    // Function to escape special characters in a string for regex
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }


    const imageCollection = db.collection('pic2');
    const imageDocs = await imageCollection.find(imageQuery).toArray();

    // If image documents are found, add them to the record
    if (imageDocs.length > 0) {
      data['Images'] = imageDocs.map(imageDoc => imageDoc['img']);
    }

    res.json(data);
  } catch (error) {
    console.error('Failed to retrieve data from MongoDB:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const { ObjectId } = require('mongodb');

app.put('/update/:_id', async (req, res) => {
  const db = req.db;
  const collection = db.collection(collectionName);

  try {
    const _id = req.params._id;
    const updateData = req.body;

    // Remove _id from updateData
    delete updateData._id;

    // Convert the string _id to ObjectId
    const objectId = new ObjectId(_id);

    // Update the document based on _id
    const result = await collection.updateOne({ '_id': objectId }, { $set: updateData });

    console.log('Update Result:', result);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.put('/updateT/:_id', async (req, res) => {
  const db = req.db;
  const collection = db.collection(collectionNameTwo);
  
  collectionName_ImgTwo
  try {
    const _id = req.params._id;
    const updateData = req.body;

    // Remove _id from updateData
    delete updateData._id;
    
    // Convert the string _id to ObjectId
    const objectId = new ObjectId(_id);

    // Update the document based on _id
    const result = await collection.updateOne({ '_id': objectId }, { $set: updateData });

    console.log('Update Result:', result);

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ message: 'Document updated successfully' });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/delete/:scientificNameI/:scientificNameII', async (req, res) => {
  const db = req.db;
  const collection = db.collection(collectionName);
  const collectionName_Img = db.collection('pic1');



  try {
      const scientificNameI = req.params.scientificNameI;
      const scientificNameII = req.params.scientificNameII;
      console.log(scientificNameI, scientificNameII);




      const query =  { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII };
        

      const result2 = await collectionName_Img.find(query).toArray();
      global.result3 = result2;




      const result = await collection.deleteOne({
        'ScientificName.I': scientificNameI,
        'ScientificName.II': scientificNameII
    });

      if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Document not found' });
      }

      // const resultImgCollection = await collectionName_Img.deleteMany({ 'ScientificName.I': scientificNameI,'ScientificName.II': scientificNameII});
      const resultImgCollection = await collectionName_Img.deleteMany({
        'Scientific_Name.I': scientificNameI,
        'Scientific_Name.II': scientificNameII
    });

      
      if (resultImgCollection.deletedCount === 0) {
          console.warn('No images found for deletion in collectionName_Img');
      }

      

      res.json({ message: 'Document and associated images deleted successfully' });
  } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }



const imgAA = [];
for (let i = 0; i < global.result3.length; i++) {
  imgAA.push(global.result3[i].img);
}

const filesToDelete = imgAA[0];

const noImg = 'haveno.jpg'
if (filesToDelete.includes(noImg)) {
console.log('YES12');
}
else {
  console.log('NO12');
  // Specify the folder path and file extensions to delete
const folderPath = './public/plantImg';
const fileExtensionsToDelete = ['.jpeg', '.jpg', '.png'];

// Get a list of files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Delete each file
  filesToDelete.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.unlink(filePath, err => {
      if (err) {
        console.error(`Error deleting file ${filePath}: ${err.message}`);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
  });
});
}






});

app.delete('/deleteImage/:scientificNameI/:scientificNameII/:fileName', async (req, res) => {
  const db = req.db;
  const { scientificNameI, scientificNameII, fileName } = req.params;
  console.log("Check:", scientificNameI, scientificNameII, fileName);

  const collectionName_Img = db.collection('pic2');
  const filePathImg = `./public/plantImgTwo/${fileName}`;

  try {
    const result = await collectionName_Img.updateOne(
      { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII },
      { $pull: { 'img': fileName } }
    );
    console.log('Update Result:', result);

    if (result.matchedCount === 0) {
      console.warn(`No document found for deletion with Scientific_Name: ${scientificNameI}, ${scientificNameII}`);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  fs.unlink(filePathImg, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log('File deleted successfully');
    }
  });
});

app.delete('/deleteImagetwo/:scientificNameI/:scientificNameII/:fileName', async (req, res) => {
  const db = req.db;
  const { scientificNameI, scientificNameII, fileName } = req.params;
  console.log("Check:", scientificNameI, scientificNameII, fileName);

  const collectionName_Img = db.collection('pic1');
  const filePathImg = `./public/plantImgTwo/${fileName}`;


  try {
    const result = await collectionName_Img.updateOne(
      { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII },
      { $pull: { 'img': fileName } }
    );
    console.log('Update Result:', result);

    if (result.matchedCount === 0) {
      console.warn(`No document found for deletion with Scientific_Name: ${scientificNameI}, ${scientificNameII}`);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  fs.unlink(filePathImg, (err) => {
    if (err) {
      console.error(`Error deleting file: ${err}`);
    } else {
      console.log('File deleted successfully');
    }
  });
});



app.delete('/deletetwo/:scientificNameI/:scientificNameII', async (req, res) => {
  const db = req.db;
  const collection = db.collection(collectionNameTwo);
  const collectionName_Img = db.collection('pic2');
  try {

    const scientificNameI = req.params.scientificNameI;
    const scientificNameII = req.params.scientificNameII;


    const query =  { 'Scientific_Name.I': scientificNameI, 'Scientific_Name.II': scientificNameII };
        

    const result2 = await collectionName_Img.find(query).toArray();
    global.result3 = result2;

    const result = await collection.deleteOne({
      'ScientificName.I': scientificNameI,
      'ScientificName.II': scientificNameII
  });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    // const resultImgCollection = await collectionName_Img.deleteMany({ 'Scientific_Name': scientificName });
          // const resultImgCollection = await collectionName_Img.deleteMany({ 'ScientificName.I': scientificNameI,'ScientificName.II': scientificNameII});
          const resultImgCollection = await collectionName_Img.deleteMany({
            'Scientific_Name.I': scientificNameI,
            'Scientific_Name.II': scientificNameII
        });
    

    if (resultImgCollection.deletedCount === 0) {
      console.warn('No images found for deletion in collectionName_Img');
    }

    res.json({ message: 'Document and associated images deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

  const imgAA = [];
for (let i = 0; i < global.result3.length; i++) {
  imgAA.push(global.result3[i].img);
}

const filesToDelete = imgAA[0];

const noImg = 'haveno.jpg'
if (filesToDelete.includes(noImg)) {
console.log('YES12');
}
else {
  console.log('NO12');
  // Specify the folder path and file extensions to delete
const folderPath = './public/plantImgTwo';
const fileExtensionsToDelete = ['.jpeg', '.jpg', '.png'];

// Get a list of files in the folder
fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error('Error reading folder:', err);
    return;
  }

  // Delete each file
  filesToDelete.forEach(file => {
    const filePath = path.join(folderPath, file);
    fs.unlink(filePath, err => {
      if (err) {
        console.error(`Error deleting file ${filePath}: ${err.message}`);
      } else {
        console.log(`File ${filePath} deleted successfully`);
      }
    });
  });
});
}

});


app.post('/upload_csv', uploadCsv.single('csvFile'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    // return res.status(400).send('No file uploaded.');
     res.redirect('/csvNoFile');
     return;
  }
  const csvContent = req.file.buffer.toString('utf8');

  const results = [];
  const parser = csvParser();
  parser.on('data', (data) => {
  results.push(data);

  });

  parser.on('end', () => {

  var jsonString = JSON.stringify(results);

  const jsonObject = JSON.parse(jsonString);

  const columnStandard = ['No.', 'Name_TH', 'Name_EN', 'OtherName_TH', 'OtherName_EN', 'ScientificName1', 'ScientificName2', 'Family', 
  'Characteristics_TH', 'Characteristics_EN', 'Ecology_TH', 'Ecology_EN', 'Distribution_TH', 'Distribution_EN', 'Utilization_TH','Utilization_EN',
  'FloweringTime_TH','FloweringTime_EN', 'FruitingTime_TH', 'FruitingTime_EN', 'Location_TH', 'Location_EN', 'commonName'  ];
    
  function verifyEmptyData(A) {
    if(A == null ){
      console.log("No data recieve")
      return true;
    }
    return false;
  }

  var resultEmpty = verifyEmptyData(jsonObject[0]);

  if (resultEmpty === true) {
    res.redirect('/csvError');
    return;
  }

  var columnImport = Object.keys(jsonObject[0]);

  function areWordListsEqual(list1, list2) {
    // Check if lengths are equal
    if (list1.length !== list2.length) {
      console.log('column not match');
      return global.colNotMactch = 0;      
    } 
    return list1.every(word => list2.includes(word));
  }

  var result = areWordListsEqual(columnStandard.slice(1), columnImport.slice(1));
  console.log(result);  

  if (result === true) {
    try  {
      let Noimg = [];
      const noImg = 'haveno.jpg';
      Noimg.push(noImg);
      const ListCsv = [];
      const ListCsvImg = [];
      const ListCheck = [];
  
      jsonObject.forEach((item) => {
        const checkNull = {
          ScientificName1: item.ScientificName1,
          ScientificName2: item.ScientificName2,
         }
        ListCheck.push(checkNull);

        const newCol = {
          Name: {TH: item.Name_TH, EN: item.Name_EN},

          OtherName: {TH: item.OtherName_TH, EN: item.OtherName_EN},

          ScientificName: {I: item.ScientificName1.trim(), II: item.ScientificName2.trim()},

          FamilyName: item.Family,

          Characteristics: {TH: item.Characteristics_TH, EN: item.Characteristics_EN},

          Ecology: {TH: item.Ecology_TH, EN: item.Ecology_EN},

          Distribution: {TH: item.Distribution_TH, EN: item.Distribution_EN},

          Utilization: {TH: item.Utilization_TH, EN: item.Utilization_EN},

          FloweringTime: {TH: item.FloweringTime_TH, EN: item.FloweringTime_EN},

          FruitingTime: {TH: item.FruitingTime_TH, EN: item.FruitingTime_EN},

          Location: {TH: item.Location_TH, EN: item.Location_EN},

          commonName: item.commonName,


      }

      const newCol_img = {
        Scientific_Name: {I:item.ScientificName1.trim(), II :item.ScientificName2.trim()},
        img: Noimg,
      }

      ListCsv.push(newCol);
      ListCsvImg.push(newCol_img);
      global.ListCsv = ListCsv;
      global.ListCsvImg = ListCsvImg;

        });

        function getValuesByKey(array, keyToFind) {
          var values = [];
          for (var i = 0; i < array.length; i++) {
            if (array[i][keyToFind] !== undefined) {
              values.push(array[i][keyToFind]);
            }
          }
          return values;
        }
        
        var ScientificNamevalues1 = getValuesByKey(ListCheck, "ScientificName1");
        var ScientificNamevalues2 = getValuesByKey(ListCheck, "ScientificName2");
        var empty = "";
        var emptyScientificName1 = ScientificNamevalues1.includes(empty);
        var emptyScientificName2 = ScientificNamevalues2.includes(empty);
  
        if (emptyScientificName1 === true || emptyScientificName2 === true) {
          res.redirect('/csvEror_sciName');
          return;
        }
  
        if (emptyScientificName1 === false && emptyScientificName2 === false) {
          csv()
          csvImg();
          res.redirect('/csvSuccess');
          return;
        }

        async function csv() {
         
          try {
            const client = await MongoClient.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });

            console.log('Data = ', global.ListCsv);
            console.log('Img = ', global.ListCsvImg);
                              
            console.log('Connected to MongoDB');
                              
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
                              
            const result = await collection.insertMany(global.ListCsv);
              
            console.log(`${result.insertedCount} documents inserted`);
            client.close(); 
              
            } catch (error) {
                console.error('Failed to retrieve data from MongoDB:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
          
        }
  
        async function csvImg() {
        
          try {
            const client = await MongoClient.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
                              
            console.log('Connected to MongoDB');
                              
            // Specify the database and collection
            const db = client.db(dbName);
            const collection = db.collection(collectionName_Img);
                              
            const result = await collection.insertMany(global.ListCsvImg);
              
            console.log(`${result.insertedCount} documents inserted`);
            client.close(); 
              
  
            } catch (error) {
                console.error('Failed to retrieve data from MongoDB:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            } 
        }
  }
   catch (e) {
    console.error("Invalid JSON:", e);
    res.redirect('/csvError');
    return;
  } 
}

  if(result === false) {
    res.redirect('/csvColumnError');
    return; 
  }
  if(global.colNotMactch == 0) {
    res.redirect('/csvColumnError');
    return; 
  }
  else {
    res.redirect('/csvError');
    return;
  }

});
  // Pipe the CSV content to the parser
  const readableStream = require('stream').Readable.from([csvContent]);
  readableStream.pipe(parser);
});
  




//upload csv2
// Handle file upload
app.post('/upload_csv2', uploadCsv.single('csvFile'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    // return res.status(400).send('No file uploaded.');
     res.redirect('/csvNoFile2');
     return;
  }
  const csvContent = req.file.buffer.toString('utf8');

  const results = [];
  const parser = csvParser();
  parser.on('data', (data) => {
  results.push(data);

  });

  parser.on('end', () => {

  var jsonString = JSON.stringify(results);

  const jsonObject = JSON.parse(jsonString);


  const columnStandard = ['No.', 'MFLU_No', 'Scientific_Name1', 'Scientific_Name2', 'Familly', 'Collector_TH', 'Collector_EN', 'CollectedDate_TH', 
  'CollectedDate_EN', 'CollectedLocation_TH', 'CollectedLocation_EN', 'Altitude', 'SpecimenType', 'FieldNote_TH', 'FieldNote_EN','FieldNote_EN',
  'FieldNote_TH','Determinator'];

  function verifyEmptyData(A) {
    if(A == null ){
      console.log("No data recieve")
      return true;
    }
    return false;
  }

  var resultEmpty = verifyEmptyData(jsonObject[0]);


  if (resultEmpty === true) {
    res.redirect('/csvError2');
    return;
  }

  var columnImport = Object.keys(jsonObject[0]);

  function areWordListsEqual(list1, list2) {
    // Check if lengths are equal
    if (list1.length !== list2.length) {
      console.log('column not match');
      return global.colNotMactch = 0;      
    } 
    return list1.every(word => list2.includes(word));
  }

  var result = areWordListsEqual(columnStandard.slice(1), columnImport.slice(1));
  console.log(result); 

  if (result === true) {
    try  {
      let Noimg = [];
      const noImg = 'haveno.jpg';
      Noimg.push(noImg);
      const ListCsv = [];
      const ListCsvImg = [];
      const ListCheck = [];
  
      jsonObject.forEach((item) => {
        const checkNull = {
          ScientificName1: item.Scientific_Name1,
          ScientificName2: item.Scientific_Name2,
         }
        ListCheck.push(checkNull);

        const newCol = {
          MFLU: item.MFLU_No,
          ScientificName: { I: item.Scientific_Name1.trim(), II: item.Scientific_Name2.trim()},
          FamilyName: item.Familly,
          LocalName: { TH: item.LocalName_TH, EN: item.LocalName_EN },
          Collector: { TH: item.Collector_TH, EN: item.Collector_EN },
          CollectedDate: { TH: item.CollectedDate_TH, EN: item.CollectedDate_EN },
          CollectedLocation: { TH: item.CollectedLocation_TH, EN: item.CollectedLocation_EN },
          Altitude: item.Altitude,
          SpecimenType: item.SpecimenType,
          FieldNote: { TH: item.FieldNote_TH, EN: item.FieldNote_EN },
          Determinator: item.Determinator,
      }

      const newCol_img = {
        Scientific_Name: {I:item.Scientific_Name1.trim(), II :item.Scientific_Name2.trim()},
        img: Noimg,
      }

      ListCsv.push(newCol);
      ListCsvImg.push(newCol_img);
      global.ListCsv = ListCsv;
      global.ListCsvImg = ListCsvImg;

        });

        function getValuesByKey(array, keyToFind) {
          var values = [];
          for (var i = 0; i < array.length; i++) {
            if (array[i][keyToFind] !== undefined) {
              values.push(array[i][keyToFind]);
            }
          }
          return values;
        }
        
        var ScientificNamevalues1 = getValuesByKey(ListCheck, "ScientificName1");
        var ScientificNamevalues2 = getValuesByKey(ListCheck, "ScientificName2");
        var empty = "";
        var emptyScientificName1 = ScientificNamevalues1.includes(empty);
        var emptyScientificName2 = ScientificNamevalues2.includes(empty);
  
        if (emptyScientificName1 === true || emptyScientificName2 === true) {
          res.redirect('/csvEror_sciName2');
          return;
        }
  
        if (emptyScientificName1 === false && emptyScientificName2 === false) {
          csv()
          csvImg();
          res.redirect('/csvSuccess2');
          return;
        }

        async function csv() {
         
          try {
            const client = await MongoClient.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });

            console.log('Data = ', global.ListCsv);
            console.log('Img = ', global.ListCsvImg);
                              
            console.log('Connected to MongoDB');
                              
            const db = client.db(dbName);
            const collection = db.collection(collectionNameTwo);
                              
            const result = await collection.insertMany(global.ListCsv);
              
            console.log(`${result.insertedCount} documents inserted`);
            client.close(); 
              
            } catch (error) {
                console.error('Failed to retrieve data from MongoDB:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            }
          
        }
  
        async function csvImg() {
        
          try {
            const client = await MongoClient.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            });
                              
            console.log('Connected to MongoDB');
                              
            // Specify the database and collection
            const db = client.db(dbName);
            const collection = db.collection(collectionName_ImgTwo);
                              
            const result = await collection.insertMany(global.ListCsvImg);
              
            console.log(`${result.insertedCount} documents inserted`);
            client.close(); 
              
  
            } catch (error) {
                console.error('Failed to retrieve data from MongoDB:', error);
                res.status(500).json({ error: 'Internal server error' });
                return;
            } 
        }
  }
   catch (e) {
    console.error("Invalid JSON:", e);
    res.redirect('/csvError2');
    return;
  } 
}

  if(result === false) {
    res.redirect('/csvColumnError2');
    return; 
  }
  if(global.colNotMactch == 0) {
    res.redirect('/csvColumnError2');
    return; 
  }
  else {
    res.redirect('/csvError2');
    return;
  }

});
  // Pipe the CSV content to the parser
  const readableStream = require('stream').Readable.from([csvContent]);
  readableStream.pipe(parser);
});
 

process.on('SIGINT', async () => {
  await mongoClient.close();
  process.exit();
});
app.get('/csvEror_sciName', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvEror_sciName.html'));
});

app.get('/csvEror_sciName2', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvEror_sciName2.html'));
});
app.get('/csvEror_MFUL_No', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvEror_MFUL_No.html'));
});


app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'h.html'));
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'newhome.html'));
});

app.get('/upadmin', (req, res) => {
  res.sendFile(path.join(__dirname, 'adminTwo.html'));
});

app.get('/upadminTwo', (req, res) => {
  res.sendFile(path.join(__dirname, 'adminF.html'));
});

app.get('/admintwo', (req, res) => {
  res.sendFile(path.join(__dirname, 'adminThree.html'));
});
app.get('/search', (req, res) => {
  res.sendFile(path.join(__dirname, 'newsearch1.html'));
});
app.get('/searchTwo', (req, res) => {
  res.sendFile(path.join(__dirname, 'newsearch2.html'));
});
app.get('/data', (req, res) => {
  res.sendFile(path.join(__dirname, 'data2.html'));
});
app.get('/update', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/updatepage.html'));
});
app.get('/updatetwo', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/updatepageTwo.html'));
});
app.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, 'h3.html'));
});
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'contactpro2.html'));
});
app.get('/but', (req, res) => {
  res.sendFile(path.join(__dirname, 'az.html'));
});
app.get('/adminhome', (req, res) => {
  res.sendFile(path.join(__dirname, 'adminFive.html'));
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at :${port}/`);
});
