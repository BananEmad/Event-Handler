let mongoose=require("mongoose");
autoIncrement=require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
mongoose.set('useCreateIndex', true);
eventschema=new mongoose.Schema({

    _id:Number,
    title:{type:String,required:true},
    eventDate:Date,
    mainSpeaker:{type:Number,ref:"speakers"},
    otherSpeakers:[{type:Number,ref:"speakers"}]

});
eventschema.plugin(autoIncrement.plugin,'events');
mongoose.model("events",eventschema);