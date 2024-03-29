const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const multer = require('multer');
const multerCsv = require('multer');

const app = express();
const port = 40000;
const { noResultHtml, nore, resultHtml } = require('./htmlTemplates');
const { noResultHtmlTwo, resultHtmlTwo, resultHtmlThree } = require('./htmlTemplatesTwo');
const { resultHtmlUp, noResultHtmlup } = require('./htmlTemplatesUp');
const { resultHtmlUptwo, noResultHtmluptwo } = require('./htmlTemplatesUpTwo');
const csvParser = require('csv-parser');
const mongoURI = 'mongodb://127.0.0.1:27017/';
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

let mongoClient;

// Set up Multer for handling file uploads
const storageCsv = multerCsv.memoryStorage(); // Store the file in memory
const uploadCsv = multerCsv({ storageCsv: storageCsv });

// Connect to MongoDB server
async function connectToMongo() {
  try {
    mongoClient = await MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
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
        const client = await MongoClient.connect(mongoURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');

        // Specify the database and collection
        const db = client.db(dbName);
        const collection = db.collection(collectionName_Img);

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

app.post('/uploadImage/:scientificName', uploadtwo.single('image'), async (req, res) => {
  const scientificName = req.params.scientificName;
  const filename = req.file.filename;

  let client;

  try {
      client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const db = client.db("tree"); // Use the specified database
      const collection = db.collection('pic2');

      // Update MongoDB collection with the filename
      await collection.updateOne(
          { Scientific_Name: scientificName },
          { $push: { img: filename } }
      );

      res.json({ success: true, message: 'Image uploaded and database updated successfully.' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
     console.log(filename)
}});

app.post('/uploadImagetwo/:scientificName', upload.single('image'), async (req, res) => {
  const scientificName = req.params.scientificName;
  const filename = req.file.filename;

  let client;

  try {
      client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
      await client.connect();

      const db = client.db("tree"); // Use the specified database
      const collection = db.collection('pic1');

      // Update MongoDB collection with the filename
      await collection.updateOne(
          { Scientific_Name: scientificName },
          { $push: { img: filename } }
      );

      res.json({ success: true, message: 'Image uploaded and database updated successfully.' });
  } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
  } finally {
     console.log(filename)
}});

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
        const client = await MongoClient.connect(mongoURI, {
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
    const client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB2222');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

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

app.post('/submitTwo', async (req, res) => {
  // Handle the data received from the client
  const dataFromClient = req.body;
  console.log('Data received from client:', dataFromClient);

  // Send a response back to the client

  try {
    const client = await MongoClient.connect(mongoURI, {
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
  const scienceName = req.body;
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
  // console.log('Data received from client:', dataFromClient);

  // console.log('reqqqqqqqqqq',scienceName_obj2);
  var imgName2 = 'haveno.jpg';

  // const  Img = {img:{0:'noImg.jpg'}};
  // let  Img2 = ['img':{0:'noImg.jpg'}];

  listImg.push(imgName2);
  const Img2 = { 'img': listImg };
  console.log('------------------', Img2);

  try {
    const client = await MongoClient.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB--img');

    // Specify the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName_Img);

    const combinedObject2 = { ...scienceName_obj2, ...Img2 };
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
    const query = {
      $or: [
        { 'MFLU': { $regex: inputText, $options: 'i' } },
        { 'FamilyName': { $regex: inputText, $options: 'i' } },
        { 'ScientificName.I': { $regex: inputText, $options: 'i' } },
        { 'ScientificName.II': { $regex: inputText, $options: 'i' } },
        { 'Collector.TH': { $regex: inputText, $options: 'i' } },
        { 'Collector.EN': { $regex: inputText, $options: 'i' } },
        { 'LocalName.TH': { $regex: inputText, $options: 'i' } },
        { 'LocalName.EN': { $regex: inputText, $options: 'i' } }
      ],
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
app.post('/displayone', async (req, res) => {
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

app.post('/displayTwol', async (req, res) => {
  const inputText = req.body.keyword;

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
    const query = {
      $or: [
        { 'MFLU': { $regex: inputText, $options: 'i' } },
        { 'FamilyName': { $regex: inputText, $options: 'i' } },
        { 'ScientificName.I': { $regex: inputText, $options: 'i' } },
        { 'ScientificName.II': { $regex: inputText, $options: 'i' } },
        { 'Collector.TH': { $regex: inputText, $options: 'i' } },
        { 'Collector.EN': { $regex: inputText, $options: 'i' } },
        { 'LocalName.TH': { $regex: inputText, $options: 'i' } },
        { 'LocalName.EN': { $regex: inputText, $options: 'i' } }
      ],
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
  const scientificName = req.query.scientificName;
  const db = req.db; // Reuse the MongoDB connection from middleware

  try {
    const collection = db.collection(collectionName);

    const query = {
      $or: [
        { 'ScientificName.I': { $regex: `^${scientificName}`, $options: 'i' } },
        { 'ScientificName.II': { $regex: `^${scientificName}`, $options: 'i' } },
      ],
    };

    const data = await collection.findOne(query);
    if (!data) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }

    const imageQuery = {
      'Scientific_Name': {
        $regex: new RegExp('^' + data['ScientificName']['I'].trim() + '$', 'i'),
      },
    };

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
  const scientificName = req.query.scientificName;
  const db = req.db; // Reuse the MongoDB connection from middleware

  try {
    const collection = db.collection(collectionNameTwo);

    const query = {
      $or: [
        { 'ScientificName.I': { $regex: `^${scientificName}`, $options: 'i' } },
        { 'ScientificName.II': { $regex: `^${scientificName}`, $options: 'i' } },
      ],
    };

    const data = await collection.findOne(query);

    if (!data) {
      res.status(404).json({ error: 'Record not found' });
      return;
    }

    const imageQuery = {
      'Scientific_Name': {
        $regex: new RegExp('^' + data['ScientificName']['I'].trim() + '$', 'i'),
      },
    };

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


app.delete('/delete/:scientificName', async (req, res) => {
  const db = req.db;
  const collection = db.collection(collectionName);
  const collectionName_Img = db.collection('pic1');
  try {
    const scientificName = req.params.scientificName;
    console.log(scientificName)
    const result = await collection.deleteOne({ 'ScientificName.I': scientificName });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const resultImgCollection = await collectionName_Img.deleteMany({ 'Scientific_Name': scientificName });

    if (resultImgCollection.deletedCount === 0) {
      console.warn('No images found for deletion in collectionName_Img');
    }

    res.json({ message: 'Document and associated images deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deleteImage/:scientificName/:fileName', async (req, res) => {
  const db = req.db;
  const { scientificName, fileName } = req.params;

  const collectionName_Img = db.collection('pic2');

  try {
    const result = await collectionName_Img.updateOne(
      { 'Scientific_Name': scientificName },
      { $pull: { 'img': fileName } }
    );

    if (result.matchedCount === 0) {
      console.warn(`No document found for deletion with Scientific_Name: ${scientificName}`);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deleteImagetwo/:scientificName/:fileName', async (req, res) => {
  const db = req.db;
  const { scientificName, fileName } = req.params;

  const collectionName_Img = db.collection('pic1');

  try {
    const result = await collectionName_Img.updateOne(
      { 'Scientific_Name': scientificName },
      { $pull: { 'img': fileName } }
    );

    if (result.matchedCount === 0) {
      console.warn(`No document found for deletion with Scientific_Name: ${scientificName}`);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/deletetwo/:scientificName', async (req, res) => {
  const db = req.db;
  const collection = db.collection(collectionNameTwo);
  const collectionName_Img = db.collection('pic2');
  try {
    const scientificName = req.params.scientificName;
    console.log(scientificName)
    const result = await collection.deleteOne({ 'ScientificName.I': scientificName });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Document not found' });
    }

    const resultImgCollection = await collectionName_Img.deleteMany({ 'Scientific_Name': scientificName });

    if (resultImgCollection.deletedCount === 0) {
      console.warn('No images found for deletion in collectionName_Img');
    }

    res.json({ message: 'Document and associated images deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Handle file upload
app.post('/upload_csv', uploadCsv.single('csvFile'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    // return res.status(400).send('No file uploaded.');
     res.redirect('/csvNoFile');
  }

  // Parse CSV content from the buffer
  const csvContent = req.file.buffer.toString('utf8');

  // Parse CSV data and insert into MongoDB
  const results = [];
  const parser = csvParser();
  parser.on('data', (data) => {
    results.push(data);
  });

  parser.on('end', () => {

// Specify the file path
const filePath = 'csvJson.json';
var jsonString = JSON.stringify(results);

// Write the JSON string to the file
fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file has been saved:', filePath);
    }
}); 


fs.readFile(filePath, 'utf-8', (err, data) => {

  try {
    const csv_data  = JSON.parse(data);

    
  //   if (err) {
  //     console.error('Error reading JSON file:', err);
      
  // } else  {
      let ListEditCol = []

      csv_data.forEach((item) => {
          // Assuming 'address' is a nested object with 'city' and 'country'
          if (item.OtherName_TH) {

              const newCol = {
                  Name: {TH: item.Name_TH, EN: item.Name_EN},

                  OtherName: {TH: item.OtherName_TH, EN: item.OtherName_EN},

                  ScientificName: {I: item.ScientificName1, II: item.ScientificName2},

                  Family: item.Family,

                  Characteristics: {TH: item.Characteristics_TH, EN: item.Characteristics_EN},

                  Ecology: {TH: item.Ecology_TH, EN: item.Ecology_EN},

                  Distribution: {TH: item.Distribution_TH, EN: item.Distribution_EN},

                  Utilization: {TH: item.Utilization_TH, EN: item.Utilization_EN},

                  FloweringTime: {TH: item.FloweringTime_TH, EN: item.FloweringTime_EN},

                  FruitingTime: {TH: item.FruitingTime_TH, EN: item.FruitingTime_EN},

                  Location: {TH: item.Location_TH, EN: item.Location_EN},

              }

              console.log(newCol);

              ListEditCol.push(newCol);
              console.log(ListEditCol);
              global.editCol = ListEditCol; 

              global.sent = 1;

          }
          else{
              global.sent = 0;
          }
        });

        if(global.sent== 1) {
          console.log('data = ', global.editCol);
        
          const filePath_2 = 'editColJson.json';
          var jsonString_2 = JSON.stringify(global.editCol);

          // Write the JSON string to the file
          fs.writeFile(filePath_2, jsonString_2, 'utf-8', (err) => {
              if (err) {
                  console.error('Error writing JSON file:', err);
              } else {
                  console.log('JSON file has been saved:', filePath_2);

                  global.send = '1';

                  modifyCsv();
                  // return res.send('record successful');
                   res.redirect('/csvSuccess');

                  
              }
          }); 
        }

        else{
          
          // return res.send("Oops! This file's columns do not meet standards");

          // global.success_data = '1';
          // res.send(global.success_data);
           res.redirect('/csvColumnError');
         

          
      // }

  }
  } catch (e) {
    console.error("Invalid JSON:", e);
    console.log('AA2',data);
    res.redirect('/csvError');

  }

  // const csv_data = JSON.parse(data);
  // console.log(csv_data);

  
  // const csv_data = JSON.parse(data);
  // console.log('nutty', data);
  // const csv_data = data;





});

function modifyCsv() {
    const filePath_3 = 'editColJson.json';

fs.readFile(filePath_3, 'utf-8',async (err, data) => {

    const csv_data = JSON.parse(data);

        if (err) {
            console.error('Error reading JSON file:', err);
            
        } else  {
            console.log('json', csv_data);


            try {
              const client = await MongoClient.connect(mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              });
                                
              console.log('Connected to MongoDB');
                                
              // Specify the database and collection
              const db = client.db(dbName);
              const collection = db.collection(collectionName);
                                
              const result = await collection.insertMany(csv_data);
                
              console.log(`${result.insertedCount} documents inserted`);
              client.close(); 
                

              } catch (error) {
                  console.error('Failed to retrieve data from MongoDB:', error);
                  res.status(500).json({ error: 'Internal server error' });
              }
        const blank = '';      

        fs.writeFile(filePath, blank, 'utf-8', (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('JSON file has been saved:', filePath);
        }
        }); 

        }

  });
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
  }

  // Parse CSV content from the buffer
  const csvContent = req.file.buffer.toString('utf8');

  // Parse CSV data and insert into MongoDB
  const results = [];
  const parser = csvParser();
  parser.on('data', (data) => {
    results.push(data);
  });

  parser.on('end', () => {

// Specify the file path
const filePath = 'csv2Json.json';
var jsonString = JSON.stringify(results);

// Write the JSON string to the file
fs.writeFile(filePath, jsonString, 'utf-8', (err) => {
    if (err) {
        console.error('Error writing JSON file:', err);
    } else {
        console.log('JSON file has been saved:', filePath);
    }
}); 


fs.readFile(filePath, 'utf-8', (err, data) => {

  try {
    const csv_data  = JSON.parse(data);

    
  //   if (err) {
  //     console.error('Error reading JSON file:', err);
      
  // } else  {
      let ListEditCol2 = []

      csv_data.forEach((item) => {
          // Assuming 'address' is a nested object with 'city' and 'country'
          if (item.FieldNote_TH) {

              const newCol2 = {
                MFLU: item.MFLU_No,
                ScientificName: { I: item.Scientific_Name1, II: item.Scientific_Name2 },
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

              console.log(newCol2);

              ListEditCol2.push(newCol2);
              console.log(ListEditCol2);
              global.editCol2 = ListEditCol2; 

              global.sent2 = 1;

          }
          else{
              global.sent2 = 0;
          }
        });

        if(global.sent2== 1) {
          console.log('data = ', global.editCol2);
        
          const filePath_22 = 'editColJson2.json';
          var jsonString_22 = JSON.stringify(global.editCol2);

          // Write the JSON string to the file
          fs.writeFile(filePath_22, jsonString_22, 'utf-8', (err) => {
              if (err) {
                  console.error('Error writing JSON file:', err);
              } else {
                  console.log('JSON file has been saved:', filePath_22);

                  global.send2 = '1';

                  modifyCsv2();
                  // return res.send('record successful');
                   res.redirect('/csvSuccess2');

                  
              }
          }); 
        }

        else{
          
          // return res.send("Oops! This file's columns do not meet standards");

          // global.success_data = '1';
          // res.send(global.success_data);
           res.redirect('/csvColumnError2');
         

          
      // }

  }
  } catch (e) {
    console.error("Invalid JSON:", e);
    console.log('AA22',data);
    res.redirect('/csvError2');

  }

  // const csv_data = JSON.parse(data);
  // console.log(csv_data);

  
  // const csv_data = JSON.parse(data);
  // console.log('nutty', data);
  // const csv_data = data;





});

function modifyCsv2() {
    const filePath_32 = 'editColJson2.json';

fs.readFile(filePath_32, 'utf-8',async (err, data) => {

    const csv_data2 = JSON.parse(data);

    
        if (err) {
            console.error('Error reading JSON file:', err);
            
        } else  {
            console.log('json', csv_data2);


            try {
              const client = await MongoClient.connect(mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              });
                                
              console.log('Connected to MongoDB');
                                
              // Specify the database and collection
              const db = client.db(dbName);
              const collection = db.collection(collectionNameTwo);
                                
              const result = await collection.insertMany(csv_data2);
                
              console.log(`${result.insertedCount} documents inserted`);
              client.close(); 
                

              } catch (error) {
                  console.error('Failed to retrieve data from MongoDB:', error);
                  res.status(500).json({ error: 'Internal server error' });
              }
        const blank = '';      

        fs.writeFile(filePath, blank, 'utf-8', (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {
          console.log('JSON file has been saved:', filePath);
        }
        }); 

        }

  });
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
