const { getUser } = require("../service/Auth");
const bodyParser=require('body-parser');

async function restricToLoggedinUserOnly(req,res,next){
    const userId=req.cookies.uid;

    if(!userId) return res.redirect('/login')

    const user=getUser(userId);
    if(!user) return res.redirect('/login')

    req.user=user;
    return next();
}

async function checkAuth(req,res,next){
    const userId=req.cookies.uid;
    // console.log('userid:',userId);
    const user=getUser(userId);
    // console.log('users:',user);
    req.user=user;
    return next();
}


module.exports={restricToLoggedinUserOnly,checkAuth}