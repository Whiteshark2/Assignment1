const mongoose=require('mongoose')

 mongoose.connect(process.env.MONGO_URL)
 const db=mongoose.connection

 db.on('error',console.error.bind(console,"Error on connecting to DB"))
 
 db.once('open',function(){
    console.log("Connected to DB")
 })

 module.exports=db