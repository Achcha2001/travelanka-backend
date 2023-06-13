const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const signupScema = new Schema({
    name: {
        type : String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
   contactnumber:{
     type:Number,
     required:true

    },
    password:{
        type:String,
        required:true
    }

})
const tourist = mongoose.model("signuptourist",signupScema);
module.exports=tourist;