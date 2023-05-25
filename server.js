const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();


require("dotenv").config();
//seperated by logical or operator
const PORT = process.env.PORT || 8070;

app.use(cors());

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

const connection = mongoose.connection;
connection.once("open", () => {
   console.log("Mongodb connection success!");

});
app.use("/login",loginRouter);
app.use("/signuptourist",tourRouter);
app.use("/contact",contactRouter);

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
});

