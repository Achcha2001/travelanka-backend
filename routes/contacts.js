const router = require("express").Router();
let Contact = require("../models/contact");

// taking the request
router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const subject = req.body.subject;
    const message = req.body.message;

    const newContact = new Contact({
        name,
        email,
        subject,
        message
    });
    //promise
    newContact.save().then(()=>{
        res.json("message logged successfully")
    }).catch((err)=>{
        console.log(err);
    })
})
//recalling
router.route("/").get((req,res)=>{
    Contact.find().then((contact)=>{
        res.json(contact)
    }).catch((err)=>{
        console.log(err);
    })
})

//update
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    //destructuring
    const{name,email,subject,message} = req.body;
    const updateContact = {
        name,
        email,
        subject,
        message
    }
    const update = await Contact.findByIdAndUpdate(userId,updateContact).then(()=>{
        res.status(200).send({status:"message updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"error updating message"})
    })
})


//delete
router.route("/delete/:id").delete(async(req ,res)=>{
    let userId = req.params.id;
    await Contact.findByIdAndDelete(userId)
    .then(()=>{
       res.status(200).send({status:"Messege deleted"})
    }).catch((err)=>{
       console.log(err.message);
       res.status(500).send({status:"Error with delete mesage",error:err.message});
   
    })
   })
   router.route("/get/:id").get(async(req,res)=>{
       let userId = req.params.id;
       const user = await Contact.findById(userId)
       .then((contact)=>{
           res.status(200).send({status:"message fetched",contact})
       }).catch(()=>{
           console.log(err.message);
           res.status(500).send({status:"Error",error:err.message});
       })
   })


module.exports = router;