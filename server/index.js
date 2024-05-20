const express = require('express');
const app = express();
const db = require('./models')
const cors =require('cors')

app.use(express.json());
app.use(cors());
//Routes
const postMethod = require('./routes/post')
app.use("/post",postMethod);

const contributorsRouther= require('./routes/contributors')
app.use("/contributors",contributorsRouther);

const usersRouther= require('./routes/users')
app.use("/auth",usersRouther);

db.sequelize.sync().then(()=> {
    app.listen(3001,() => {
        console.log("Server is running")
    });
    
});



