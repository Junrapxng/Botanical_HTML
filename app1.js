const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const { MongoClient, Binary } = require('mongodb');
const mongoURI = 'mongodb://127.0.0.1:27017/';
const dbName = 'tree';
const collectionName_data = 'new3';
const collectionName_Img = 'pic1'
var bodyParser = require('body-parser');
const myDictionary = {};

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
let imgList = []








const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {
        // Specify your folder name
        cb(null, path.join(__dirname, 'plantImg'));
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


// Handle multiple image uploads
app.post('/upload', upload.array('images'), async(req, res,file) => {

    let listImg = []
    var imgNo = 'img '
    for (let key in imgList) {
        // console.log(`${[key]}: ${imgList[key]}`);
        console.log(`${imgNo+[key]}: ${imgList[key]}`);
        // listA.push(`${imgNo+[key]}: ${imgList[key]}`);
        listImg.push(`${imgList[key]}`);
    }

    console.log('List name of image',listImg);
    
    const  Img = {'img':listImg};
    console.log('------------------', Img);


        const jsonString = JSON.stringify(Img, null, 2);

        const filePath = 'ScienceName.json';       
        // Read the JSON file
        fs.readFile(filePath, 'utf-8',async (err, data) => {

            var scienceName_obj = JSON.parse(data);

            if (err) {
                console.error('Error reading JSON file:', err);
                
            } else  {
                const combinedObject = { ...scienceName_obj, ...Img }; 
                console.log('Data send to mongoDB = ',combinedObject);
            
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


    app.post('/upload_noImg', async(req, res) => {
        let listImg = [];
        const scienceName_obj2 = req.body;
        // console.log('Data received from client:', dataFromClient);

        // console.log('reqqqqqqqqqq',scienceName_obj2);
        var imgName2 = 'noImg.jpg';
        
        // const  Img = {img:{0:'noImg.jpg'}};
        // let  Img2 = ['img':{0:'noImg.jpg'}];

        listImg.push(imgName2);
        const  Img2 = {'img':listImg};
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
                    console.log('Data send to mongoDB = ',combinedObject2);

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



app.post('/submit', async (req, res) => {
        // Handle the data received from the client
        const dataFromClient = req.body;
        console.log('Data received from client:', dataFromClient);

        // Send a response back to the client
        res.json({ message: 'Data received successfully!' });

        try {
            const client = await MongoClient.connect(mongoURI, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
            });
        
            console.log('Connected to MongoDB--forms');
        
            // Specify the database and collection
            const db = client.db(dbName);
            const collection = db.collection(collectionName_data);
        
            // Insert the data into the collection
            const result = await collection.insertOne(dataFromClient);
            console.log(`Inserted ${result.insertedCount} document into the collection--form`);
            client.close(); 
        
          } catch (error) {
            console.error('Failed to retrieve data from MongoDB:', error);
            res.status(500).json({ error: 'Internal server error' });
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

// Serve uploaded images
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'admin.html'));
// });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
