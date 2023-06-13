const express = require('express');
const router = express.Router();
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes } = require('firebase/storage');

const Property = require('../models/postadd');

const firebaseConfig = {
  apiKey: "AIzaSyDJq-SNfcd7XB-jFKrPXhI_ZYmkEJ1Uopw",
  authDomain: "travelanka-7f736.firebaseapp.com",
  projectId: "travelanka-7f736",
  storageBucket: "travelanka-7f736.appspot.com",
  messagingSenderId: "743575272700",
  appId: "1:743575272700:web:e01c0eb92cea7dfe102b79",
  measurementId: "G-FVN21BYE3E"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const travelRef = ref(storage, "images");

// Multer configuration for file upload
const upload = multer({ dest: 'uploads/' });

// POST route for adding a new property
router.post('/add', upload.array('images', 5), async (req, res) => {
  try {
    const images = req.files.map((file) => file.path);

    // Create a new Property instance with the submitted data
    const property = new Property({
      propertyName: req.body.propertyName,
      district: req.body.district, 
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      address: req.body.address,
      accommodationType: req.body.accommodationType, 
    });

    // Save the property to MongoDB
    const savedProperty = await property.save();

    // Upload images to Firebase Storage
    try {
      for (const file of req.files) {
        const storageRef = ref(travelRef, file.originalname);
        await uploadBytes(storageRef, file.buffer);
        console.log('Image uploaded:', file.originalname);
      }
    } catch (error) {
      console.log('Error uploading images:', error);
    }

    res.status(200).json({ success: true, message: 'Property added successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to add property', error: error.message });
  }
});
// GET route for retrieving all properties
router.get('/get', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ success: true, properties });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to retrieve properties', error: error.message });
  }
});


module.exports = router;
