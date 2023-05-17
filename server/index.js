const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
require('./db');

// load all the vars from .env file to the proccess
dotenv.config();

const app = express();
// body parser
app.use(express.json());
app.use(cors());

app.use((req,res,next)=>{
    console.log(req.method + ': '+ req.url);
    next();
});

// home page Access Point Interface
app.get("/", (req,res)=>{
    res.send("<h1>Vacations API</h1>")
});

// router middlwere
app.use('/vacations', require('./routes/vacations'));
app.use('/auth', require('./routes/auth'));
app.use('/folows', require('./routes/follows'));


app.listen(4000, () => console.log('server started http://localhost:4000'))


