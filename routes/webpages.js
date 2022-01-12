const express=require('express')
const router=express.Router();




router.get('/',(req,res)=>
{
    res.render('home.ejs');
});
router.get('/cart',(req,res)=>
{
    res.render('coustomer/cart.ejs');
})
router.get('/login',(req,res)=>
{
    res.render('coustomer/login.ejs');
})
router.get('/register',(req,res)=>
{
    res.render('coustomer/register.ejs');
})

module.exports=router;