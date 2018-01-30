const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  name:{
    type:String,
    required:[true,"Name feild is required"]
  },
  locality:{
    type:String,
    required:[true,"Locality feild is required"]
  },
  pocession:{
    type:String
  },
  area:{
    type:String,
    required:[true,"Area feild is required"]
  },
  price_range:{
    type:String,
    required:[true,"Price feild is required"]
  },
  image_url:{
    type:String,
    required:[true,"Image feild is required"]
  },
  summary:String,
  available:Boolean
});

module.exports = mongoose.model('Property',propertySchema);
