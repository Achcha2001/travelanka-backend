const mongoose = require('mongoose');

// Create a schema for the property data
const propertySchema = new mongoose.Schema({
  propertyName: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  accommodationType: {
    type: String,
    required: true,
  },
});

// Create a model based on the schema
const Property = mongoose.model('postadd', propertySchema);

module.exports = Property;
