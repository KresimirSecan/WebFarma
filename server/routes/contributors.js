const express = require('express')
const router = express.Router()
const {contributors} = require ('../models')
const uuid = require('uuid');
const {validateToken} =require('../middlewares/AuthMiddleware')


router.get('/:drugId',async (req,res) =>{
    const contributor =await  contributors.findAll({where : {drugId : req.params.drugId}});
    res.json(contributor);
});

router.post('/',validateToken,async (req,res) =>{
    const contrib = req.body
    contrib.id = uuid.v4();
    await contributors.create(contrib )
    res.json(contrib)

});



module.exports = router