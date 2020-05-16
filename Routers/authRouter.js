const express = require("express");
let path = require("path");
require("./../Models/speakersModel.js");
let speakerModel = mongoose.model("speakers");
const authenticationRouter = express.Router();

//==================login======================================
//login Get method
authenticationRouter.get("/login", (request, respond) => {
    respond.render("auth/login");
});



//===============================================================================================
//login post method
authenticationRouter.post("/login", (request, response) => {
 
 //Admin===========================
    if (request.body.userName == "eman" && request.body.userPassword == "123")
     {  request.session.role="admin";
         request.session.name=request.body.userName;
          response.redirect('/admin/profile');
     }


//speaker=======================================================
    else {

        speakerModel.find({ $and:[{UserName: request.body.userName},{ Password: request.body.userPassword }]})
            .then((data) => {
                  
                if (data.length == 1) {
                    request.session.role="speaker"
                    //name
                    request.session.userdata=data;
                    request.session.name=request.body.userName;
                    response.redirect('/speaker/profile');
                }
                else
                response.redirect('/login');
            })
            .catch((error) => {
                console.log(error + "");
                response.redirect('/login');
            });
    }
});


//============================register==========================================================   
//register Get method
authenticationRouter.get("/register", (request, response) => {

    response.render("auth/register.ejs");
});
//==================================================================
//register post method
authenticationRouter.post("/register", (request, response) => {
    let newspeaker=new speakerModel(request.body);
    newspeaker.save()
    .then((data)=> { response.redirect('/login');})
    .catch((error)=>{ response.redirect('/register');});
});

//==========================================================================


//logout Get method
authenticationRouter.get("/logout", (request, respond) => {
    respond.send("logout");
});
module.exports = authenticationRouter;