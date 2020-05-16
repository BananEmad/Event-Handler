mongoose=require("mongoose");

speakerschema=new mongoose.Schema({

    _id:Number,
    FullName:String,
    UserName:String,
    Password:Number,
    Address: {
        city:String,
        street:Number,
        building:Number

    }

});

mongoose.model("speakers",speakerschema);