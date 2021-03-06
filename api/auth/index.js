import jwt from 'jsonwebtoken';
import Users from '../models/User';

//metodo de autenticacion
const isAuthenticated = (req, res, next) =>  {
    const token = req.headers.authorization
    if(!token){
        return res.sendStatus(403)
    }
    // console.log(token);
    jwt.verify(token, 'mi-secreto', (err, decoded) => {
        const { _id } = decoded
        Users.findOne({_id}).exec()
        .then(user => {
            req.user = user
            next()
        })
    })
}

//metodo de autorizacion
const hasRole = role => (req, res, next) => {
    if(req.user.role === role){
        return next()
    }
    res.sendStatus(403)
}


module.exports = {
    isAuthenticated,
    hasRole,
}