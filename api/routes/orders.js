const express = require('express')
const orders = require ('../models/Orders')
import { isAuthenticated } from '../auth/index'

const router = express.Router()

router.get('/', (req, res) => {
    orders.find()
    .exec()
    .then(x => res.status(200).send(x))
})

router.get('/:id', (req, res) => {
    orders.findById(req.params.id)
    .exec()
    .then(x => res.status(200).send(x))
})

router.post('/', isAuthenticated, (req, res) => {
    const { _id } = req.user
    orders.create( {...req.body, user_id: _id} ).then(x => res.status(201).send(x))
})

router.put('/:id', isAuthenticated, (req, res) => {
    orders.findOneAndUpdate(req.params.id, req.body)
    .then(() => res.sendStatus(204))
})

router.delete('/:id', isAuthenticated, (req, res) => {
    orders.findOneAndDelete(req.params.id).exec().then(()=>res.sendStatus(204))
})

module.exports = router