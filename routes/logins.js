
let Login = require("../models/login");

//taking the data as a request
// router.route("/add").post((req,res) =>
// {
//     const name = req.body.name;
//     const password = req.body.password;

//     //creating a object from login model

//     const newLogin = new Login({
//         name,
//         password
//     })
//     //js promise
//     newLogin.save().then(()=>{
//         res.json("Login Added")
//     }).catch((err)=>{
//         console.log(err);

//     })
    
// })

const express = require('express');
const bcrypt = require('bcrypt');
// const User = require('../models/User');

const router = express.Router();

// Login route
router.post('/add', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Find the user by name in the database
    const user = await Login.findOne({ name });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }

    // Login successful
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'An error occurred while logging in' });
  }
});

module.exports = router;



//recalling data from the db

router.route("/").get((req,res)=>{
    Login.find().then((login)=>{
        res.json(login)
    }).catch((err)=>{
        console.log(err)
    })
})
//update
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    //destructuring
    const{name,password} = req.body;
    const updateLogin = {
        name,
        password
    }
    const update = await Login.findByIdAndUpdate(userId,updateLogin).then(()=>{
        res.status(200).send({status:"Login updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error updating login"})
    })
})

//delete
router.route("/delete/:id").delete(async(req ,res)=>{
    let userId = req.params.id;
    await Login.findByIdAndDelete(userId)
    .then(()=>{
       res.status(200).send({status:"Login deleted"})
    }).catch((err)=>{
       console.log(err.message);
       res.status(500).send({status:"Error with delete Login",error:err.message});
   
    })
   })
   router.route("/get/:id").get(async(req,res)=>{
       let userId = req.params.id;
       const user = await Login.findById(userId)
       .then((login)=>{
           res.status(200).send({status:"login fetched",login})
       }).catch(()=>{
           console.log(err.message);
           res.status(500).send({status:"Error",error:err.message});
       })
   })

   module.exports = router;