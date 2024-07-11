const express = require('express');
const soap = require('soap');
const bodyParser = require('body-parser');
const app = express();
const db = require('./models')
const cors =require('cors')
const { v4: uuidv4 } = require('uuid');
const wsdlUrl = 'http://schemas.xmlsoap.org/soap/envelope/'; 
//const wsdlUrl = 'URL OF WSDL'; 

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());



app.post('/fetchAndInsertData', async (req, res) => {
    const args = req.body;  
    try {
        const client = await soap.createClientAsync(wsdlUrl);
        const result = await client.LijekInfoAsync(args);
        
        const { name, containing } = result[0];

        const newDrug = await db.drugs.create({
            id: uuidv4(), 
            name,
            containing
        });

        res.json(newDrug); 
    } catch (error) {
        console.error('Error fetching and inserting data:', error);
        res.status(500).json({ error: 'An error occurred while fetching and inserting data.' });
    }
});





//Routes
const postMethod = require('./routes/drug')
app.use("/drug",postMethod);

const symptompsRouter = require('./routes/symptomps')
app.use("/symptomps",symptompsRouter);

const contributorsRouther= require('./routes/contributors')
app.use("/contributors",contributorsRouther);

const usersRouther= require('./routes/users')
app.use("/auth",usersRouther);


db.sequelize.sync().then(()=> {
    app.listen(3001,() => {
        console.log("Server is running")
    });
    
});



