const express=require('express');
const router=express.Router();
const {handleSignUp,handleLogin}=require('../controller/User_definiation')

router.post('/',handleSignUp)

router.post('/login',handleLogin)


module.exports={router};