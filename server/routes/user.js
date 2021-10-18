const router = require('express').Router()
const User = require('../models/user')
const auth = require('../middlewares/auth')





// Carts page
router.get('/me/books', auth, async(req, res)=>{
    const {id} = req.user
    try{
        const user = await User.findById(id)
        await user.populate('books')
        res.json(user.books)
    } catch (e) {
        res.status(500).json()
    }
})

router.get('/me', auth, async (req, res)=>{
    res.json(req.user)
})

router.get('', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (e) {
        res.status(500).json(e)
    }
})

router.put('/me', auth, async (req, res) => {

    // To check if value in valid values for updates
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'phone', 'address', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).json({ error: 'error value for updates' })
    }

    const {user} = req
    try {
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        res.status(200).json(user)
    } catch (e) {
        res.status(400).json(e)
    }
})

router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.json(req.user)
    } catch (e) {
        res.status(400).json(e)
    }
})


module.exports = router