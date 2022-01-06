const express=require('express');
const app=express();
const port=process.env.PORT||8000;
const path=require('path');
const { start } = require('repl');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));
//assets
app.use('/',express.static(path.join(__dirname,'public')));





app.get('/',(req,res)=>
{
    res.render('home');
})
///set template engine
app.listen(port,()=>
{
    console.log(`listening on ${port}`);
}) 