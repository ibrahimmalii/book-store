const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


router.get('', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id)
        return !user ? res.status(404).send() : res.status(200).send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('', async (req, res) => {
    const newUser = new User(req.body)
    try {
        await newUser.save()
        const token = await newUser.generateAuthToken()
        res.status(201).send({newUser, token})
    } catch (e) {
        return res.status(400).send(e)
    }
})

router.post('/login', async (req, res)=>{
    try{
        const {email, password} = req.body
        const user = await User.findByCredentials(email, password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    }catch (e){
        res.status(400).send(e)
    }
})

router.put('/update/:id', async (req, res) => {
    const { id } = req.params

    // To check if value in valid values for updates
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'phone', 'address', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'error value for updates' })
    }

    try {
        const user = await User.findById(id)
        updates.forEach(update => user[update] = req.body[update])
        await user.save()
        return !user ? res.status(404).send('user not found') : res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findByIdAndDelete(id)
        return !user ? req.status(404).send : req.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router