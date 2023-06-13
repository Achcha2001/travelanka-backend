const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TourSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  },
  contactnumber: {
    type: Number,
    required: true
  },
  validity: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  image: [
    {
      type: String
    }
  ]
});

const TourGuide = mongoose.model('tourregister', TourSchema);
module.exports = TourGuide;
