const jwt = require('jsonwebtoken')
const User = require('../models/user')



const auth = async (req, res, next) => {
    try{
        const {authorization} = req.headers
        const token = authorization.replace('Bearer ', '')
        const decode = jwt.verify(token, 'PASSWORD_KEY') 
        const user = await User.findOne({'_id': decode._id, 'tokens.token': token})
        if(!user) throw new Error()

        // Now we can send user in the req
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error: 'pleas authenticate first.'})
    }

    // next()
}

module.exports = auth