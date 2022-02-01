const { request } = require("express");
const express = require("express");
const router = express.Router();
const menu = require("../models/menu.js");
const user =require("../models/user");
const jwt = require('jsonwebtoken');
router.get("/", async (req, res) => {
  try {
    const data = await menu.find();
    var token = req.cookies.refreshToken;
    if(token)
    { 
     const verifyuser=jwt.verify(token,'anirudh');
     const username= await user.findOne({email:verifyuser.email});
     const name=username.name;
     const size=username.cart.length;
     res.render("home.ejs", { datas: data,name,size});
    }
    else
    {

       res.render("authhome.ejs");

    }
  } catch (err) {
    console.log(err);
  }
});



router.get("/login", (req, res) => {
  res.render("coustomer/login.ejs");
});
router.get("/register", (req, res) => {
  res.render("coustomer/register.ejs");
});

module.exports = router;
