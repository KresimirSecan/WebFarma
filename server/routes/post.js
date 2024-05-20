const express = require('express')
const router = express.Router()
const {drugs} = require ('../models')
const uuid = require('uuid');
const { Op } = require('sequelize');
const {validateToken} =require('../middlewares/AuthMiddleware')

router.get('/',async (req,res) =>{
    const alldrugs =await  drugs.findAll();
    res.json(alldrugs);
});

router.get('/id/:id',async (req,res) =>{
    const drug =await  drugs.findByPk(req.params.id);
    res.json(drug);
});

router.get('/search/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params; 
    try {
        const matchingDrugs = await drugs.findAll({
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`,
                },
            },
        });
        res.json(matchingDrugs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/',validateToken,async (req,res) =>{
    const post = req.body
    post.id = uuid.v4();
    await drugs.create(post)
    res.json(post)

});

router.delete('/:drugId',validateToken,async (req,res) =>{
    const id = req.params.drugId

    await drugs.destroy({where : {
        id : commentId,

    },

    });
    res.json("deleted");
});

module.exports = router