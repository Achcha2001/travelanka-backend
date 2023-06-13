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
});
LoginScema.pre('save', async function (next) {
    try {
      const user = this;
  
      // Only hash the password if it is new or modified
      if (!user.isModified('password')) {
        return next();
      }
      // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Replace the password with the hashed one
    user.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
const Login = mongoose.model("log",LoginScema);
 module.exports=Login;