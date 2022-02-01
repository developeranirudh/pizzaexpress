const mongoose=require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  email:{
      type:String,
      required:true,
      unique:true,
      trim:true
  },
password:{
    type:String,
    required:true
},
cart: [
  {
      type: mongoose.Schema.Types.ObjectId,
      ref:'menu'
  }
]

});
const users=mongoose.model('users',userSchema);
module.exports=users;