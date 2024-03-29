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
        let ListEditCol = [];
        let ListEditCol_img = [];
  
        let Noimg = [];
        const noImg = 'haveno.jpg';
        Noimg.push(noImg);
  
        csv_data.forEach((item) => {
            // Assuming 'address' is a nested object with 'city' and 'country'
            if (item.CommonName) {
  
                const newCol = {
                  Name: {TH: item.Name_TH, EN: item.Name_EN},
  
                  CommonName: item.CommonName,
  
                  ScientificName: {I: item.ScientificName1, II: item.ScientificName2},
  
                  FamilyName: item.FamilyName,
  
                  LocalName: {TH: item.LocalName_TH, EN: item.LocalName_EN},
  
                  Characteristics: {TH: item.Characteristics_TH, EN: item.Characteristics_EN},
  
                  Habit: {TH: item.Habit_TH, EN: item.Habit_EN},
  
                  Utilization: {TH: item.Utilization_TH, EN: item.Utilization_EN},
  
                  FloweringTime: {TH: item.FloweringTime_TH, EN: item.FloweringTime_EN},
  
                  FruitingTime: {TH: item.FruitingTime_TH, EN: item.FruitingTime_EN},
  
                }
  
                const newCol_img = {
                  Scientific_Name: item.ScientificName1,
                  img: Noimg,
  
                }
  
                console.log(newCol);
                console.log('CCC',newCol_img);
  
  
                ListEditCol.push(newCol);
                ListEditCol_img.push(newCol_img);
  
                console.log(ListEditCol);
                global.editCol = ListEditCol; 
                global.editCol_img = ListEditCol_img;
  
                global.sent11 = 1;
  
            }
            else{
                global.sent11 = 0;
            }
          });
  
          if(global.sent11== 1) {
            console.log('data = ', global.editCol);
          
            const filePath_2 = 'editColJson.json';
            const filePath_22 = 'editColJson_img.json';
            var jsonString_2 = JSON.stringify(global.editCol);
            var jsonString_22 = JSON.stringify(global.editCol_img);
  
            // Write the JSON string to the file
            fs.writeFile(filePath_2, jsonString_2, 'utf-8', (err) => {
                if (err) {
                    console.error('Error writing JSON file:', err);
                } else {
                    console.log('JSON file has been saved:', filePath_2);
  
                    global.send = '1';
  
                    modifyCsv();
                    // return res.send('record successful');
                     
  
                    
                }
            }); 
  
            fs.writeFile(filePath_22, jsonString_22, 'utf-8', (err) => {
              if (err) {
                  console.error('Error writing JSON file:', err);
              } else {
                  console.log('JSON file has been saved:', filePath_22);
  
                  global.send11 = '1';
  
                  modifyCsv_img();
                  // return res.send('record successful');
                   global.csvAnimal_img = 1;
  
                  
              }
          });
  
          global.sent== 2;
          res.redirect('/csvSuccess');
          
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
                const collection = db.collection(collectionName_data);
                                  
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
  
  
  function modifyCsv_img() {
    const filePath_3 = 'editColJson_img.json';
  
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
              const collection = db.collection(collectionName_Img);
                                
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