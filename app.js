const express=require('express');
const app=express();
const port=process.env.PORT||8000;
const router=require('./routes/webpages.js')
const path=require('path');
const { start } = require('repl');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'/views'));
//assets ///set template engine
app.use('/',express.static(path.join(__dirname,'public')));
app.use(router);
app.listen(port,()=>
{
    console.log(`listening on ${port}`);
}) 