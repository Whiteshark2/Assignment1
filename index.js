const express=require('express')
const app=express()
require('dotenv').config()
const db=require('./config/mongoose')


app.use('/api',require('./routes/index'))


const port=process.env.PORT

app.listen(port,(err)=>{
    if(err){console.log(`Error in listening at port : ${port}`)}else{
        console.log(`Server is running at port : ${port}`)
    }

})