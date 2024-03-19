const express=require('express')
const app=express()
require('dotenv').config()
require('./config/mongoose')




app.use(express.urlencoded())
app.use(express.json())



app.use('/api',require('./routes/index'))



const port=process.env.PORT

app.listen(port,(err)=>{
    if(err){console.log(`Error in listening at port : ${port}`)}else{
        console.log(`Server is running at port : ${port}`)
    }

})