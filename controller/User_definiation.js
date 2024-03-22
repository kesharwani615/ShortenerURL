const {user}=require('../models/user');
const { v4:uuidv4 }=require('uuid')
const {setUser}=require('../service/Auth')

async function handleSignUp(req,res){
    const {name,email,password}=req.body;
    if(!name||!email||!password) return alert("please fill all details!");
    const result=await user.create({
    name:name,
    email:email,
    password:password,
    })
    // console.log("rs:",result);
    return res.render('home');
}

async function handleLogin(req,res){
    const {email,password}=req.body;
    const userLogin=await user.findOne({email,password});
    // console.log("userLogin:",userLogin)
    if(!userLogin){
        return res.render('Login',{
            err:"invalid user and password!"
        });
    }
    const token=setUser(userLogin);
    res.cookie('uid',token);
    return res.redirect('/');
}


module.exports={handleSignUp,handleLogin}