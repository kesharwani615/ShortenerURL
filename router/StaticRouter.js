const express=require('express');
const router=express.Router();
const {URL}=require('../models/url')

router.get('/',async(req,res)=>{
    if(!req.user) return res.redirect('/login');
    const allUrls=await URL.find({CreatedBy:req.user._id});
    console.log('allUrl:',allUrls);
    return res.render("home",{urls:allUrls});
    })

router.get('/signup',(req,res)=>{
    return res.render('SignUp');
})

router.get('/login',(req,res)=>{
    return res.render('Login');
})

module.exports={router}