const express = require ("express");
const multer = require('multer');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require('firebase-admin');
const app = express();
const upload = multer();

const serviceAccount = require('./travelanka-7f736-firebase-adminsdk-p2lyo-ad0d7f464c.json'); // Replace with the path to your service account key JSON file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Access the Firebase database using admin.firestore()
const db = admin.firestore();

require("dotenv").config();
//seperated by logical or operator
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://front-achcha2001.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

//key value paring
app.use(bodyParser.json());
//to cnnect to the db

const URL = process.env.MONGODB_URL;
console.log(URL);

mongoose.connect(URL, {
    
    useNewUrlParser:true,
    useUnifiedTopology: true,
    
});

//open the connection 
const loginRouter = require("./routes/logins");
const tourRouter = require("./routes/signuptourists");
const contactRouter = require("./routes/contacts");
const accRouter = require("./routes/accregistration");
const guideRouter = require("./routes/tourregistration");
const postRouter = require("./routes/postadd");
const payRouter = require("./routes/paypal");
const connection = mongoose.connection;
connection.once("open", () => {
   console.log("Mongodb connection success!");

});
app.use("/login",loginRouter);
app.use("/signuptourist",tourRouter);
app.use("/contact",contactRouter);
app.use("/accommodation",accRouter);
app.use("/postadd",postRouter);
app.use("/guide",guideRouter);
app.use("/pay",payRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none());

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});

