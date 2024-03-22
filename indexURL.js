const express=require('express');
const path=require('path');
// const {URL}=require('./models/url')
const cookieParser=require('cookie-parser');
//routers
const URLRouter=require('./router/URLRouter');
const StaticRouter=require('./router/StaticRouter');
const UserRouter=require('./router/UserRouter')

const {restricToLoggedinUserOnly,checkAuth}=require('./middleware/auth')
const {connectMongoDB}=require('./ConnectMongo')
const app=express();
const PORT=7000;

connectMongoDB('mongodb://127.0.0.1:27017/CreateURL')
.then(()=>console.log("MongoDB is connected!"))
.catch((err)=>console.log("try again!",err))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.set("view engine","ejs");

app.set("views",path.resolve("./view"));

app.use('/url',restricToLoggedinUserOnly,URLRouter.router);

app.use('/',checkAuth,StaticRouter.router);

app.use('/user',UserRouter.router);

app.listen(PORT,()=>console.log('Server is running!'));
