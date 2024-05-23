const express = require('express');
const router = express.Router();
const { symptomps } = require('../models');
const uuid = require('uuid');
const { Op } = require('sequelize');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const { count, rows } = await symptomps.findAndCountAll({
        limit,
        offset,
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
        symptomps: rows,
        totalPages,
    });
});

router.get('/id/:id', async (req, res) => {
    const symp = await symptomps.findByPk(req.params.id);
    res.json(symp);
});

router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    post.id = uuid.v4();
    await symptomps.create(post);
    res.json(post);
});

router.get('/search/:searchTerm', async (req, res) => {
    const { searchTerm } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    try {
        const symptompsMatches = await symptomps.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${searchTerm}%`,
                },
            },
            limit: limit,
            offset: offset,
        });

        res.json({ 
            symptomps: symptompsMatches.rows,
            totalPages: Math.ceil(symptompsMatches.count / limit),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
