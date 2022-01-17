//Manejador de los pedidos de las comidas

const express = require('express')
const { send } = require('express/lib/response')
const Users = require('../models/User')

const router = express.Router()

router.post('/register', (req, res) => {
    res.send('soy registro')
})

router.post('/login', (req, res) => {
    res.send('soy login')
})

module.exports = router;