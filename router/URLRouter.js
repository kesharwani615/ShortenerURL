const express=require('express');
const router=express.Router();
const bodyParser=require('body-parser');

const {handleGenerateNewShortURL,handledelete,handleGetData,handleGetAllData,handleClickCount} = require('../controller/URL_defination')

router.use(express.urlencoded({extended:false}));
router.use(bodyParser.json());
// handleGenerateNewShortURL
router.post('/',handleGenerateNewShortURL);

router.delete('/:id',handledelete)

router.get('/:shortid',handleGetData)

router.get('/',handleGetAllData);

router.get('/analytics/:shortid',handleClickCount);

module.exports={router}