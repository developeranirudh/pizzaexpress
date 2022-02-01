const { request } = require("express");
const express = require("express");
const router = express.Router();
const menu = require("../models/menu.js");
const user =require("../models/user");
const jwt = require('jsonwebtoken');
const sendemail = require('../utils/sendemail.js');
require('dotenv').config();
const { default: Stripe } = require("stripe");
router.get("/cart", async(req, res) => {
    var token = req.cookies.refreshToken;
    const verifyuser=jwt.verify(token,'anirudh');
    const username= await user.findOne({email:verifyuser.email});
    const name=username.name;
    const cart=username.cart;
    const usercart= await user.findById(username._id).populate('cart');
    const size=username.cart.lenght; 
    const cartdata=usercart.cart;
    if(cart.length===0)
    {
      res.render("coustomer/emptycart.ejs",{name,size});
    }
    else{
  
      res.render("coustomer/cart.ejs",{name,cartdata,size});
    }


  });
  router.post("/cart/:id/add", async (req, res) => {
    const token = req.cookies.refreshToken;
    const verifyuser=jwt.verify(token,'anirudh');
    const username= await user.findOne({email:verifyuser.email});
    username.cart.push(req.params.id);
    // console.log(req.params);
    await username.save();
    req.flash('success', 'Pizza added to your cart successfully');
    res.redirect('/');
  });

  router.post("/deletecart/:id",async(req,res)=>
  { 
    const token = req.cookies.refreshToken;
    const verifyuser=jwt.verify(token,'anirudh');
    const username= await user.findOne({email:verifyuser.email});
    const pizzaid=req.params.id;
    // console.log(pizzaid);
    // console.log(username);
    await user.findByIdAndUpdate(username._id,{$pull:{cart:pizzaid}})
    res.redirect('/cart');
  });

router.post("/order",async(req,res)=>
{
  const token = req.cookies.refreshToken;
  const verifyuser=jwt.verify(token,'anirudh');
  const username= await user.findOne({email:verifyuser.email});
  const cart= username.cart;
  await user.findByIdAndUpdate(username._id,{$pullAll:{cart}})
  console.log(req.body);
  const msg = {
    to: username.email, // Change to your recipient
    from: process.env.EMAIL,
    subject: "Thank You  For Your Order @ Pizza Express",
    html: `
    <strong> Hello,<br> Dear ${username.name} we just received your Order.</Strong>
    <br>
    <p>We will deliver your Order in just 30 minutes at ${req.body.address} and we Also call on number ${req.body.phonenumber} Before delivery.</p>
    <img src="https://github.com/anirudh079/Anirudh-Assignment-005-Chitkara-Coding-Block/blob/main/portfolio/pizza.png?raw=true"alt="logo">
    <h3 style="color:#FF9999; font-size:20px; font-family:Verdana; " >Enjoy your Order<br>
   `
  }
  sendemail(msg);
  res.redirect('/cart');
})

module.exports = router;
