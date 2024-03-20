const asyncHandler=require('express-async-handler')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const generateToken=require('../config/generateToken')


module.exports.register=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const user=await User.findOne({email:email})
    if(user){
        res.json({message:"User already exist"})
    }else{
        const hashedPassword=await bcrypt.hash(password,10)
        const newUser=await User.create({
            name,email,password:hashedPassword
        })
         res.status(200).json({
            message:'User is created!',
            newUser
        })
    }
})

module.exports.login=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const user=await User.findOne({email:email})
    if(user|| await bcrypt.compare(password, user.password)){
        res.json({
            id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken.token(user.id)
        })
    }else{
        res.status(404).json({
            message:"Invalid User Email/Password"
        })
    }
})

module.exports.profile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user.id)
    if(user){
        res.status(200).json({
            id:user.id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(401).json({
            message:"Not Authorisied"
        })
    }
})