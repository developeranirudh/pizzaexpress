require('dotenv').config();
const sgMail=require('@sendgrid/mail');
const express = require('express');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail= ( msg)=>
{
  sgMail.send(msg)
    .then((response) => {
      console.log('email send');
    })
    .catch((error) => {
      console.error(error)
    })
}
module.exports=sendEmail;