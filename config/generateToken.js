const jwt=require('jsonwebtoken')

module.exports.token=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'15d'
    })
}