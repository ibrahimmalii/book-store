const router = require('express').Router()

router.post('/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({user, token})
    } catch (e) {
        return res.status(400).json(e)
    }
})


router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.status(200).json({user,token})
    }catch (e){
        res.status(400).json(e)
    }
})

module.exports = router