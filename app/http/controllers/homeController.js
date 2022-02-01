const res = require("express/lib/response")

function homeControllers(){

    return {
        index(){
         res.render('home');
        }
    }

}