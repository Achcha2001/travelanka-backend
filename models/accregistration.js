const mongoose = require('mongoose');

const { Schema } = mongoose;

const RegisterSchema = new Schema({
  fullName: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  accommodationType: {
    type: String,
    required: true,
  },
  registeredName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  contactNumber1: {
    type: Number,
    required: true,
  },
  contactNumber2: {
    type: Number,
  },
  images: [
    {
      type: String,
    },
  ],
});

const Accommodation = mongoose.model('Accommodation', RegisterSchema);

module.exports = Accommodation;
