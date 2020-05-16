const express=require("express");
const speakerRouter=express.Router();
let path=require("path");
let speakerModel=mongoose.model("speakers");
let eventModel=mongoose.model("events");
//================================================================
speakerRouter.get("/profile",(request,response)=>{
   
    response.render("users/speakerProfile.ejs");
});

//==========================================================

speakerRouter.get("/listevents",(request,response)=>{
   
eventModel.find({})
    .then((data)=>{
        response.render("users/listevents.ejs",{events:data});

       
    } )
    .catch((error)=> {console.log(error+"");})
});



//==============================================================





speakerRouter.get("/editinfo",(request,response)=>{
    response.render("users/editinfo.ejs");});
//     speakerModel.find({_id:request.params._id})
//     .then((data)=> {
        
//         response.render("admin/edit.ejs",{speaker:data})})
//     .catch((error)=>{console.log(error)})
// });

//============================================================================
speakerRouter.post("/editinfo/:_id?",(request,response)=>{
    
    speakerModel.updateOne({_id:request.params._id},{$set:request.body})
    .then((data)=> {response.redirect("/admin/list");})
    .catch((error)=>{console.log(error+"");});

});



module.exports=speakerRouter;