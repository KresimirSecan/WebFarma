const express = require('express');
const router = express.Router();
const { drugs, symptomps } = require('../models');
const uuid = require('uuid');
const { Op } = require('sequelize');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const { rows, count } = await drugs.findAndCountAll({
            limit: limit,
            offset: offset,
        });

        res.json({
            drugs: rows,
            total: count,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/id/:id', async (req, res) => {
    const drug = await drugs.findByPk(req.params.id);
    res.json(drug);
});

router.get('/search/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const drugMatches = await drugs.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`,
                },
            },
            limit: limit,
            offset: offset,
        });

        res.json({ 
            drugs: drugMatches.rows,
            totalPages: Math.ceil(drugMatches.count / limit),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    post.id = uuid.v4();
    await drugs.create(post);
    res.json(post);
});

router.delete('/:drugId', validateToken, async (req, res) => {
    const id = req.params.drugId;

    await drugs.destroy({
        where: {
            id: id,
        },
    });
    res.json("deleted");
});

module.exports = router;
