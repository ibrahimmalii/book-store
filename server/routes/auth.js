const router = require('express').Router()
const User = require('../models/user')

router.post('/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({ user, token })
    } catch (e) {
        return res.status(400).json(e)
    }
})


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.status(200).json({ user, token })
    } catch (e) {
        res.status(400).json(e)
    }
})


router.post('/oauthsignup', async (req, res) => {
    const { name, email } = req.body
    try {
        const ifExist = await User.checkExist(email)
        if (!ifExist) {

            try {
                const newUser = await new User({ name, email, password: 'randompass' })
                // const password = await newUser.generateRandomPassword()
                const token = await newUser.generateAuthToken()
                res.json({ user: newUser, token })
            } catch (e) {
                res.status(500).json()
            }

        } else {
            try{
                const user = await User.findOne({ email })
                console.log(user)
                const token = await user.generateAuthToken()
                res.send({ user, token })
            } catch (e) {
                res.status(500).json()
            }
        }

    } catch (e) {
        res.status(500).json(`Can't create an account`)
    }

})

module.exports = router