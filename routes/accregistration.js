const router = require('express').Router();
const multer = require('multer');
const bcrypt = require('bcrypt');
const Accommodation = require('../models/accregistration');
const { initializeApp } = require('firebase/app');
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Set up multer storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Firebase app
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

router.route('/add').post(upload.array('images', 5), async (req, res) => {
  const {
    fullName,
    email,
    contactNumber,
    username,
    password,
    district,
    accommodationType,
    registeredName,
    address,
    description,
    contactNumber1,
    contactNumber2,
  } = req.body;
  const images = req.files; // Use req.files instead of req.file for multiple file uploads

  // Encrypt the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send({ status: 'Error encrypting password' });
      return;
    }

    const newAccommodation = new Accommodation({
      fullName,
      email,
      contactNumber,
      username,
      password: hashedPassword, // Store the hashed password
      district,
      accommodationType,
      registeredName,
      address,
      description,
      contactNumber1,
      contactNumber2,
    });

    const uploadedImageUrls = [];
    const uploadPromises = [];

    for (const image of images) {
      const imageRef = ref(storageRef, `accommodation/${image.originalname}`);
      const uploadPromise = uploadBytes(imageRef, image.buffer)
        .then(() => {
          return getDownloadURL(imageRef)
            .then((downloadURL) => {
              uploadedImageUrls.push(downloadURL);
            });
        })
        .catch((err) => {
          console.log(err);
          throw new Error('Error uploading image');
        });

      uploadPromises.push(uploadPromise);
    }

    Promise.all(uploadPromises)
      .then(() => {
        newAccommodation.images = uploadedImageUrls; // Assign the uploaded image URLs to the "images" field of the new accommodation
        return newAccommodation.save();
      })
      .then(() => {
        res.json('Registered! Images uploaded successfully');
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: 'Error saving registration' });
      });
  });
});

router.route('/update/:id').put(async (req, res) => {
  const userId = req.params.id;
  const {
    fullName,
    email,
    contactNumber,
    username,
    password,
    district,
    accommodationType,
    registeredName,
    address,
    description,
    contactNumber1,
    contactNumber2,
  } = req.body;

  // Encrypt the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.log(err);
      res.status(500).send({ status: 'Error encrypting password' });
      return;
    }

    const updateAccommodation = {
      fullName,
      email,
      contactNumber,
      username,
      password: hashedPassword, // Store the hashed password
      district,
      accommodationType,
      registeredName,
      address,
      description,
      contactNumber1,
      contactNumber2,
    };

    Accommodation
      .findByIdAndUpdate(userId, updateAccommodation)
      .then(() => {
        res.status(200).send({ status: 'Registration updated' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({ status: 'Error updating data' });
      });
  });
});
;

router.get('/get', async (req, res) => {
  try {
    const properties = await Accommodation.find({}, 'district accommodationType registeredName address description contactNumber1 contactNumber2');

    res.status(200).json(properties);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
