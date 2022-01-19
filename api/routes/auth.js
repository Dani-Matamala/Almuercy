//Manejador de los pedidos de las comidas
const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const Users = require('../models/User')

const router = express.Router()

const singToken = (_id) => {
    return jwt.sign({_id}, 'mi-secreto', {
        expiresIn: 60*60*24*365,
    })
}

router.post('/register', (req, res) => {
    const { email, password } = req.body
    crypto.randomByte(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 100, 64, "sha1", (err, key) => {
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
    const { email, password } = req.body
    Users.findOne({email}).exec()
    .then(user => {
        if(!user){
            return res.send('usuario y/o contraseña incorrectos')
        }
        crypto.pbkdf2(password, user.salt, 100, 64, 'sha1', (err, key) => {
            const encrytedPassword = key.toString('base64')
            if(user.password === encrytedPassword){
                const token = singToken(user._id)
                return res.send({token})
            }
            return res.send('usuario y/o contraseña incorrectos')
        })
    })
})

module.exports = router;