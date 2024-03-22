const ShortUniqueId=require('short-unique-id');

const {URL}=require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    console.log("body:",body.user);
    if(!body.url) return res.status(400).json({error:'url is required!'})

    const ShortID = new ShortUniqueId({ length: 10 });
    const uid=ShortID.rnd();
       const result=await URL.create({
       shortId:uid,
       redirectURL:body.url,
       VisitHistory:[],
       CreatedBy:req.user._id,//something error user is not showing req url,will have to write id of user
    })
    // console.log("result:",result);
    return res.render('home',{id:uid});
}

async function handledelete(req,res){
   console.log(req.params.id)
   const delURL= await URL.findByIdAndDelete(req.params.id)
   if(!delURL) return res.status(400).json({err:"id not found!"})
   res.json({msg:"successful!"})
}

async function handleGetData(req,res){
    const shortid=req.params.shortid;
    const entry=await URL.findOneAndUpdate(
        {
            shortId:shortid,
        },
        {$push:{
            VisitHistory:{
                timestamp:Date.now(),
            },
        },
       }
        )
        res.redirect(entry.redirectURL)

}

async function handleGetAllData(req,res){
    const AllData=await URL.find({});
    res.json(AllData);    
}

async function handleClickCount(req,res){
    const shortid=req.params.shortid;
    console.log("hi",shortid)
    const click=await URL.findOne({shortId:shortid});
    console.log(click)
    res.json({
        totalClick:click.VisitHistory.length,
        analytics:click.VisitHistory
    })
}

module.exports={
    handleGenerateNewShortURL,handledelete,handleGetData,handleGetAllData,handleClickCount
}