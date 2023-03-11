const express = require ("express");
const newrecipe = require("./model/recipeDb.js");
// const Collection = require ('./model/recipeDb.js');
const app = new express();
// var cors = require('cors');
// app.use(cors());
 const path = require ('path')
app.use(express.urlencoded({
extended : true
}))
app.use(express.json());
 app.use(express.static(path.join(__dirname,'/build')))
//CORS policy
app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","*")
res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE")
res.setHeader("Access-Control-Allow-Headers","X-Requested-With,content-type")
res.setHeader("Access-Control-Allow-Credentials",true)
next()

})
 

//  app.get('/about',(req,res)=>{
// res.send("recipeee")
//  })  


 app.post('/api/addrecipe' , (req,res) =>{

 console.log( req.body);
       const recipelist =  newrecipe(req.body); // passing the data to db
       recipelist.save() // save to db
 
 res.send("Data Sent");

 
 });

 app.get('/api/view', async (req,res) =>{
  try{
let result = await newrecipe.find();
res.json(result)
// console.log("app successsssss")
  }
  catch(error){
    res.send(error)
  }
 })

 //update

 app.post('/api/update', async(req,res) =>{
  try{
    let result = await  newrecipe.findByIdAndUpdate(req.body._id, req.body)
    
   
   res.send("data updated")
  }
catch   (error){
res.send(error)
}                        
 })

//Delate
app.post('/api/delate',async(req,res) =>{
await newrecipe.findByIdAndDelete(req.body._id);
res.send("data delated")
})


 app.get('/*',function(req,res){
res.sendFile(path.join(__dirname,'/build/index.html'))
 })

app.listen(3001,()=>{
  console.log("srever is running in 3001")
})