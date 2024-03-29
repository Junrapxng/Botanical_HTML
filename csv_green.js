const express = require('express');
const multer = require('multer');
const multerCsv = require('multer');
const csvParser = require('csv-parser');
const mongoose = require('mongoose');
const { MongoClient, Binary } = require('mongodb');

const app = express();
const port = 3000;

const path = require('path');
const fs = require('fs');

const mongoURI = 'mongodb://127.0.0.1:27017/';
const dbName = 'tree';
const collectionName = 'CsvGreen';



// Define a mongoose model for the CSV data
const CsvModel = mongoose.model('CsvData', {
  // Define your schema based on the CSV structure
  // For example, if your CSV has columns 'name' and 'age', you can define:
  name: String,
  age: Number,
});

// Set up Multer for handling file uploads
const storageCsv = multerCsv.memoryStorage(); // Store the file in memory
const uploadCsv = multerCsv({ storageCsv: storageCsv });

// Serve HTML page with file upload form
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + './csvGreen.html' D:\csv\csvGreen.html);
// });

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'csvGreen.html'));
// });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'csv.html'));
});

app.get('/csvColumnError', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvColumnError.html'));
});

app.get('/csvSuccess', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvSuccess.html'));
});

app.get('/csvNoFile', (req, res) => {
  res.sendFile(path.join(__dirname, 'csvNoFile.html'));
});



// Handle file upload
app.post('/upload_csv', uploadCsv.single('csvFile'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    // return res.status(400).send('No file uploaded.');
    return res.redirect('/csvNoFile');
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

    const csv_data = JSON.parse(data);
    console.log(csv_data);

        if (err) {
            console.error('Error reading JSON file:', err);
            
        } else  {
            let ListEditCol = []

            csv_data.forEach((item) => {
                // Assuming 'address' is a nested object with 'city' and 'country'
                if (item.Name_TH || item.ScientificName1) {

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
               

                
            }

        }


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




app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});