const router = require("express").Router();
let Login = require("../models/login");

//taking the data as a request
router.route("/add").post((req,res) =>
{
    const name = req.body.name;
    const password = req.body.password;

    //creating a object from login model

    const newLogin = new Login({
        name,
        password
    })
    //js promise
    newLogin.save().then(()=>{
        res.json("Login Added")
    }).catch((err)=>{
        console.log(err);

    })
    
})


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