const express=require('express')
const router=express.Router()
const userController=require('../controllers/userController')
const {protect}=require('../config/authMiddleware')

router.post('/signup',userController.register)
router.post('/login',userController.login)
router.get('/profile',protect,userController.profile)
router.get('/verify/:token',userController.verify)


module.exports=router