const express = require('express')
const router = express.Router()
const {users} = require ('../models')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const{sign} = require('jsonwebtoken')
const {validateToken} =require('../middlewares/AuthMiddleware')

router.post('/', async (req, res) => {
    const { username, password, picture } = req.body;
  
      
    const hash = await bcrypt.hash(password, 10);
  
    await users.create({
        id: uuidv4(),
        username: username,
        password: hash,
        picture: picture || null
      });
  
    res.json({ message: 'User created successfully' });

  });

router.post('/login',async (req,res) =>{
    const { username, password } = req.body;

    try {
        const user = await users.findOne({ where: { username: username } });

        if (!user) {
            return res.status(404).json({ error: "User doesn't exist" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: "Wrong login" });
        }

        const accessToken = sign(
            { username: user.username, id: user.id },
            "importantsecret"
        );

        return res.json({ token: accessToken, username: username, id: user.id });
    } catch (error) {
        console.error("An error occurred during login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

});

router.get('/userinfo/:id' , async (req,res) =>{
    const info = await users.findByPk(req.params.id, {
        attributes: { exclude: ['password'] }
    });

    if (info.picture) {
        info.picture = Buffer.from(info.picture).toString('base64');   
    }

    res.json(info);

 });


router.get('/auth',validateToken , async (req,res) =>{
   res.json(req.user);
});

module.exports = router