const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const {protect}=require('../config/authMiddleware')

router.post('/signup',userController.register)
router.post('/login',userController.login)
router.get('/profile',protect,userController.profile)


module.exports=router