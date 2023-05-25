const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ContactScema = new Schema({
    name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{

        type:String,
        required:true
    }
})
const Contact = mongoose.model("contact",ContactScema);
module.exports =Contact;
