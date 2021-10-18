const jwt = require('jsonwebtoken')
const User = require('../models/user')



const auth = async (req, res, next) => {
    try{
        const {authorization} = req.headers
        !authorization && res.send(301).json('Invalid token..')
        const token = authorization.replace('Bearer ', '')
        const decode = jwt.verify(token, 'PASSWORD_KEY') 
        const user = await User.findOne({'_id': decode._id, 'tokens.token': token})
        if(!user) throw new Error()

        // Now we can send user in the req
        req.user = user
        next()
    } catch (e) {
        res.status(401).json({error: 'pleas authenticate first.'})
    }
}

// const verifyTokenAndAuthorization = (req, res, next) => {
//     (req.user.id == req.params.id || user.isAdmin) ? next() : res.statis.json('You are not allowed to do that..')
// }

module.exports = auth