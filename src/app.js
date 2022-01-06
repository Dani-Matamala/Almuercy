const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const { send } = require('express/lib/response')

//creando el servidor con express
const app = express()

//middlerware o plugins 
app.use(bodyParser.json())
app.use(cors())
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.get('*', (req, res) => {
    res.send("chanchito Feliz")
})

module.exports = app;

