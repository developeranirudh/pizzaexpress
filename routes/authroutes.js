const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const sendemail = require('../utils/sendemail.js');
const jwt = require('jsonwebtoken');
router.post('/register', async (req, res) => {
  try {
    const passcode=req.body.password;
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(passcode, salt);
    let data = req.body;
    await user.create(data);
    req.flash('success', 'Successfully registered');
    res.redirect('/login');
    const msg = {
      to: data.email, // Change to your recipient
      from: process.env.EMAIL,
      subject: 'Registered In Pizza Express',
      html: `
      <strong> Hello,<br> Dear ${data.name} You just registered in Our Pizza Express Website</Strong>
      <br>
      <img src="https://github.com/anirudh079/Anirudh-Assignment-005-Chitkara-Coding-Block/blob/main/portfolio/pizza.png?raw=true"alt="logo">
      <br>
      <h3 style="color:#FF9999; font-size:20px; font-family:Verdana; " >Are you hungry ?<br>
      What Are You Waiting For?
      </h3>
    <button style= "color: rgb(255, 255, 255);border:rgb(235, 99, 99) solid 2px;padding: 4px 12px 4px 12px;border-radius:20px ;background-color:rgb(235, 99, 99)" ;>  OrderNow </button>`,
    }
    sendemail(msg);
  }
  catch {
    req.flash('error', 'This E-mail is already registered');
    res.redirect('/register');
  }
})
router.post('/login', async (req, res) => {

  const data = await user.findOne({ email: req.body.email });
  // console.log(data);
  if (data) {
    const password = req.body.password;
    // console.log(data.password);
    const ismatch = await bcrypt.compare(password,data.password);
    console.log(ismatch);
    if (ismatch) {
      ///////////////////token///////////////////////////////////
      const token = jwt.sign({
        email: data.email
      }, 'anirudh', { expiresIn: "10h" });
      ////////////////flash////////////////////////
      req.flash('success', 'successfully Logged-In');
      res.cookie("refreshToken", token, {
        httpOnly: true
      });
      ///////////////////////////////////////////////////////////////
      // console.log(token);
      res.redirect("/");
     ////////////////////email/////////////////////////////////////
      const msg = {
        to: data.email, // Change to your recipient
        from: process.env.EMAIL,
        subject: 'Logged-In Pizza Express',
        html: `
         <strong> Hello,<br> Dear ${data.name} You just Logged-In in Our Pizza Express Website</Strong>
         <br>
         <img src="https://github.com/anirudh079/Anirudh-Assignment-005-Chitkara-Coding-Block/blob/main/portfolio/pizza.png?raw=true"alt="logo">
         <br>
         <h3 style="color:#FF9999; font-size:20px; font-family:Verdana; " >Are you hungry ?<br>
         What Are You Waiting For?
         </h3>
       <button style= "color: rgb(255, 255, 255);border:rgb(235, 99, 99) solid 2px;padding: 4px 12px 4px 12px;border-radius:20px ;background-color:rgb(235, 99, 99)" ;>  OrderNow </button>`,
      }
      sendemail(msg);
    }
    else {

      req.flash('error', ' Please Check Your( E-mail & Password )');
      res.redirect("/login");
    }
  }
  else {

    req.flash('error', ' Please Check Your( E-mail & Password )');
    res.redirect("/login");
  }
})

module.exports = router;