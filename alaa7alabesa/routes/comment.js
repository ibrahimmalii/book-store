const router = require('express').Router()
const auth = require('../middlewares/auth')
const Comment = require('../models/comment')


router.post('/:id', auth,async (req, res)=>{
    const user = req.user
    const {id} = req.params
    const {description} = req.body 
    try{    
        const comment = await new Comment({description, ownerId: user._id, bookId : id}).save()
        res.send(comment)
    } catch (e) {
        res.status(500).json()
    }
})


router.get('/', async (req, res)=>{
    const comments = await Comment.find()
    res.send(comments)
})

module.exports = router