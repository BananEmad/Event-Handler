const express=require("express");
const adminRouter=express.Router();
let path=require("path");
require("./../Models/speakersModel.js");
let speakerModel=mongoose.model("speakers");

adminRouter.get("/profile",(request,respond)=> { respond.render("admin/adminProfile.ejs"); })





//===============================================================
adminRouter.get("/list",(request,response)=>{
    
    speakerModel.find({})
    .then((data)=>{
       response.render("admin/list.ejs",{speakers:data});
       
    } )
    .catch((error)=> {console.log(error+"");})
});

//================================================

//speaker delet
adminRouter.post("/delete",(request,response)=>{
    
    speakerModel.deleteOne({_id:request.body._id})
    .then((data)=> {response.send("Done")})
    .catch((error)=>{console.log(error)})
});
//===================================================================
    //speaker edit post
    adminRouter.post("/edit/:_id?",(request,response)=>{
    
    speakerModel.updateOne({_id:request.params._id},{$set:request.body})
    .then((data)=> {response.redirect("/admin/list");})
    .catch((error)=>{console.log(error+"");});

});
//====================================================================================
//speaker edit get
adminRouter.get("/edit/:_id",(request,response)=>{
   
    speakerModel.find({_id:request.params._id})
    .then((data)=> {
        
        response.render("admin/edit.ejs",{speaker:data})})
    .catch((error)=>{console.log(error)})
});

//============================================================================



module.exports=adminRouter;