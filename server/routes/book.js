const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const Book = require('../models/book')


router.post('/', auth, async(req, res)=>{
    const {_id} = req.user
    console.log(_id)
    const book = new Book({...req.body, owner: _id})
    try{
        await book.save()
        
        res.status(201).send(book)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/me', auth, async(req, res)=>{
    const {_id} = req.user
    try{
        const books = await Book.find({'owner': _id})
        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/:id', auth, async(req, res)=>{
    const {id} = req.params
    try{
        const book =await Book.findById(id)
        const owner = await book.populate('owner') //==> To GET user who is related with it 
        if(!book){
            return res.status(400).send('No books found')
        }
        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})



router.put('/:id', auth, async(req, res)=>{
    const {id} = req.params
    try{
        const newBook = await Book.findByIdAndUpdata(id, req.body)
        await newBook.save()
        // return !newBook ? res.status(400).send('no book like this') : res.send(newBook)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('', auth, async(req, res)=>{
    try{
        const books = await Book.find()
        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router