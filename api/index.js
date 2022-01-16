const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config();

const meals = require('./routes/meals')
const orders = require('./routes/orders')
//creando el servidor con express
const app = express()

//middlerware o plugins 
app.use(bodyParser.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })


app.use('/api/meals', meals)
app.use('/api/orders', orders)

module.exports = app;