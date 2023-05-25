const router = require("express").Router();
let tourist = require("../models/signuptourist");


router.route("/add").post((req,res)=>{
const name = req.body.name;
const email = req.body.email;
const password = req.body.password;
const newtourist = new tourist({
    name,
    email,
    password
})
newtourist.save().then(()=>{
    res.json("Signup added")
}).catch((err)=>{
    console.log(err);
})

})
router.route("/").get((req,res)=>{
    tourist.find().then((tourist)=>{
        res.json(tourist)
    }).catch((err)=>{
        console.log(err)
    })
})

//update
//update curent data can done by post too
router.route("/update/:id").put(async(req,res)=>{
    //fetch the id from req parameter
    let userId = req.params.id;
    //destrucuring
    const {name,email,password} = req.body;


    const updateSignup = {
        name,
        email,
        password
    }
    const update = await tourist.findByIdAndUpdate(userId,updateSignup).then(()=>
    { res.status(200).send({status:"User updated"})
   
}).catch((err)=>{console.log(err);
res.status(500).send({status:"Error updating data"});

})
})


//delete
router.route("/delete/:id").delete(async(req ,res)=>{
    let userId = req.params.id;
    await tourist.findByIdAndDelete(userId)
    .then(()=>{
       res.status(200).send({status:"User deleted"})
    }).catch((err)=>{
       console.log(err.message);
       res.status(500).send({status:"Error with delete user",error:err.message});
   
    })
   })
   router.route("/get/:id").get(async(req,res)=>{
       let userId = req.params.id;
       const user = await tourist.findById(userId)
       .then((tourist)=>{
           res.status(200).send({status:"user fetched",tourist})
       }).catch(()=>{
           console.log(err.message);
           res.status(500).send({status:"Error with get user",error:err.message});
       })
   })
   module.exports = router;