let express=require("express");
let path=require("path");
mongoose=require("mongoose");
let authObject=require("./Routers/authRouter");

let adminObject=require("./Routers/adminRouter");
let eventObject=require("./Routers/eventRouter");
let speakerObject=require("./Routers/speakerRouter");
const session = require('express-session');
const server=express();




//===========setting port===============================================================================
server.listen(8085,()=>{
    console.log("listening on 8085");
});


//===========setting mongoose database====================================================================
mongoose.connect("mongodb://localhost:27017/nodeproject",{ useNewUrlParser: true,useUnifiedTopology: true  })
        .then(()=> {console.log("DB connected succefuly")})
        .catch((error)=>{ console.log(error+"")} );


//===========settings====================================================================================

    server.use(express.urlencoded({"extended":false}));
    server.set("view engine","ejs");
    server.set("views",path.join(__dirname,"views"));
    server.use(express.static(path.join(__dirname,"public")));
    server.use(express.static(path.join(__dirname,"node_modules","bootstrap","dist")));
    server.use(express.json());
    server.use(session({secret: 'banan',saveUninitialized: true,resave: false}));

    
  

//routers===============================================================================================
server.use((request,response,next)=>{
    console.log("user entered : "+request.url,request.method);
     next();
  
    });

    server.get("/",function(request,response){
        response.render("index.ejs");
    });
    server.use(authObject);
  
    server.use((request,response,next)=>{
       if(request.session.role)
       {
            //locals=sessionname
           if(request.session.userdata)
            { response.locals.userdata=request.session.userdata;}
            response.locals.name=request.session.name;
            next();
       
       }
         else{
            response.redirect('/login');
         }
      
        });
    server.use("/admin",adminObject);
    server.use("/event",eventObject);
    server.use("/speaker",speakerObject);
    server.use((request,response)=>{
        console.log("defult middleware");
         
        });