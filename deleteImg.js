app.delete('/deleteImage/:scientificName/:fileName', async (req, res) => {
    const db = req.db;
    const { scientificName, fileName } = req.params;
  
    const collectionName_Img = db.collection('pic2');
    const filePathImg = `./public/plantImgTwo/${fileName}`;
  
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
    fs.unlink(filePathImg, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      } else {
        console.log('File deleted successfully');
      }
    });
  });