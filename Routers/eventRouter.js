const express=require("express");
const eventRouter=express.Router();
require("./../Models/eventModel.js");
let eventModel=mongoose.model("events");
let speakerModel=mongoose.model("speakers");


eventRouter.get("/list",(request,response)=>{
    eventModel.find({}).populate("otherSpeakers").populate("mainSpeaker")
    .then((data)=>{
        response.render("events/list.ejs",{events:data});
    } )
    .catch((error)=> {console.log(error+"");
    response.render("adminProfile.ejs");})
});

//===============================================================================
eventRouter.get("/add",(request,response)=>{
   
    speakerModel.find({}).then((speakers)=>{
        response.render("events/addEvent.ejs",{speakers:speakers});
    }).catch((error)=>{
        response.render("adminProfile.ejs");
        console.log(error);})
    
    
   

});
//==================================================================================

eventRouter.post("/add",(request,response)=>

{  let newevent=new eventModel(request.body);
    newevent.save()
    .then((data)=> {
        console.log(data);
        response.redirect("/event/list");})
    .catch((error)=>{console.log(error+"");});
});
//========================================================================================
eventRouter.get("/edit/:_id?",(request,response)=>{
    
   
    eventModel.find({_id:request.params._id}).populate("otherSpeakers").populate("mainSpeaker")
    .then((data)=> {
        speakerModel.find({}).then((speakers)=>{
            response.render("events/edit.ejs",{events:data,speakers:speakers});
        }).catch((error)=>{
            response.render("adminProfile.ejs");
            console.log(error)})
        })
    .catch((error)=>{
        response.render("adminProfile.ejs");
        console.log(error)})


});
//============================================================================================

eventRouter.post("/edit/:_id",(request,response)=>{
    console.log(request.body)
    eventModel.updateOne({_id:request.params._id},{"$set":request.body})
    .then((data)=> {response.redirect("/event/list");})
    .catch((error)=>{console.log(error+"");});
});

//===========================================================================================
eventRouter.get("/delete/:_id",(request,response)=>{
    
    eventModel.deleteOne({_id:request.params._id})
    .then((data)=> {response.send("success delete")})
    .catch((error)=>{console.log(error)})
});

//*=========================================================================================

eventRouter.post("/delete",(request,response)=>{
  
    
   
    eventModel.deleteOne({_id:request.body._id})
    .then((data)=> {response.send("success delete")})
    .catch((error)=>{console.log(error)})
});




module.exports=eventRouter;