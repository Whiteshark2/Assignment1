const asyncHandler=require('express-async-handler')
const User=require('../models/user')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const generateToken=require('../config/generateToken')
const {mailer}=require('../config/nodemailer')


module.exports.register=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body
    const user=await User.findOne({email:email})
    if(user){
        res.json({message:"User already exist"})
    }else{
        const token = jwt.sign({name,email,password }, 'yourSecretKey', { expiresIn: '1h' });
        mailer(name,email,token)
        return res.json({
            message:"Email Verification sent to your mail.Please verify in order to sign up successfully"
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

module.exports.verify = asyncHandler(async(req, res) => {
    const { token } = req.params;
    jwt.verify(token, 'yourSecretKey', async(err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "Invalid or expired token" });
        } else {
            const {name, email,password } = decoded;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword
            });
            res.status(200).json({ message: 'User created successfully', newUser });
        }
    });
});