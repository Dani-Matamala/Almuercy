//Manejador de los pedidos de las comidas
const express = require('express')
const crypto = require('crypto')
const Users = require('../models/User')

const router = express.Router()

router.post('/register', (req, res) => {
    const { email, password } = req.body
    crypto.randomByte(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 100, 64, sha1, (err, key) => {
            const encrytedPassword = key.toString('base64')
            Users.findOne({email}).exec()
                .then(user => {
                    if(user){
                        return res.send('usario ya existe')
                    }
                    Users.create({
                        email,
                        password: encrytedPassword,
                        salt: newSalt,
                    }).then(() => {
                        res.send('usuario creado con éxito')
                    })
                })
        })
    })
})

router.post('/login', (req, res) => {
    res.send('soy login')
})

module.exports = router;