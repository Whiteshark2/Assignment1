const mongoose=require('mongoose')
console.log(process.env.MONGO_URL)
 mongoose.connect(process.env.MONGO_URL)
 const db=mongoose.connection

 db.on('error',console.error.bind(console,"Error on connecting to DB"))
 
 db.once('open',function(){
    console.log("Connected to DB")
 })

 module.exports=db