const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const LoginScema = new Schema({
    name : {
        type : String,
        required:true 
    },
    password :{
        type : String,
        required : true
    }
})
const Login = mongoose.model("log",LoginScema);
 module.exports=Login;