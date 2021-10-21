const express = require('express')
const router = express.Router()
const {auth, verifyTokenAndAuthorization} = require('../middlewares/auth')
const Book = require('../models/book')


router.post('/', auth, async(req, res)=>{
    const {_id} = req.user
    const book = new Book({...req.body, 'owners.owner': _id})
    try{
        await book.save()
        
        res.status(201).json(book)
    } catch (e) {
        res.status(500).json()
    }
})

router.get('/me', auth, async(req, res)=>{
    const {_id} = req.user
    try{
        const books = await Book.find({'owners.owner': _id})
        res.json(books)
    } catch (e) {
        res.status(500).json()
    }
})

router.get('/:id', auth, async(req, res)=>{
    const {id} = req.params
    try{
        const book =await Book.findById(id)
        await book.populate('comments')
        if(!book){
            return res.status(400).json('No books found')
        }
        res.json(book)
    } catch (e) {
        res.status(500).json()
    }
})


// To Buy A New Book
// router.put('/buy', auth, async(req, res)=>{
//     const [booksID] = req.body
//     const {ownerID} = req.user
//     console.log(req.body)
//     try{
//         req.body.bookID.forEach(async(book)=>{
//             const currentBook = await Book.findById(book)
//             currentBook.owners = currentBook.owners.concat({ownerID})
//             // console.log(currentBook)
//             await currentBook.save()
//         })
//     } catch (e) {
//         res.status(500).json()
//     }
// })

router.get('', auth, async(req, res)=>{
    try{
        const books = await Book.find()
        // await books.populate('departments')
        res.json(books)
    } catch (e) {
        res.status(500).json()
    }
})

module.exports = router