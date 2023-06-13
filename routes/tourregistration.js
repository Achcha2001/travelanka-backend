const router = require('express').Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const TourGuide = require('../models/tourregistration');
const { getStorage, ref, uploadBytes } = require('firebase/storage');
const { getDownloadURL } = require('firebase/storage');
const { initializeApp } = require('firebase/app');

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initializing firebase
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
const storageRef = ref(getStorage(app));



router.route('/add').post(upload.single('image'), async (req, res) => {
  const {
    fullname,
    age,
    language,
    registrationNumber,
    contactnumber,
    validity,
    email,
    username,
    password,
    category,
  } = req.body;
  const image = req.file;

  // Encrypt the password
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send({ status: 'Error encrypting password' });
      return;
    }

    try {
      const newTourGuide = new TourGuide({
        fullname,
        age,
        language,
        registrationNumber,
        contactnumber,
        validity,
        email,
        username,
        password: hashedPassword,
        category,
        image: [],
      });

      if (image) {
        const storageRef = ref(storageRef, `tourguide/${image.originalname}`);
        await uploadBytes(storageRef, image.buffer);
        const downloadURL = await getDownloadURL(storageRef);
        newTourGuide.image.push(downloadURL);
      }

      await newTourGuide.save();
      res.json('Registered! Image uploaded successfully');
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'Error saving registration' });
    }
  });
});
// Retrieve tour guides
router.route('/get').get(async (req, res) => {
    try {
      const tourGuides = await TourGuide.find();
      res.json(tourGuides);
    } catch (error) {
      console.log(error);
      res.status(500).send({ status: 'Error fetching tour guides' });
    }
  });

module.exports = router;
