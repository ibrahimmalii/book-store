const express = require('express')
const router = express.Router()
const multer = require('multer')
const sharp = require('sharp')
const auth = require('../middlewares/auth')
const Book = require('../models/book')
const User = require('../models/user')


const upload = multer({
    limits: {
        fileSize: 3000000 // 3 MG
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Please upload only image'))
        }
        cb(undefined, true)
    }
})


router.post('/', upload.single('avatar'), async (req, res) => {
    const book = new Book(req.body)
    if (req.file) {
        const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
        book.avatar = buffer
    }

    try {
        await book.save()

        res.status(201).json(book)
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/me', auth, async (req, res) => {
    const { _id } = req.user
    try {
        const books = await Book.find({ 'owners.owner': _id }, { avatar: 0 })
        res.json(books)
    } catch (e) {
        res.status(500).json()
    }
})

// Get Books Image
router.get('/:id/avatar', async(req, res)=>{
    try{
        const book = await Book.findById(req.params.id)
        if(!book || !book.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(book.avatar)
    }catch(e){
        res.status(404).send()
    }
})

router.get('/:id', auth, async (req, res) => {
    const { id } = req.params
    try {
        const book = await Book.findOne({ _id: id }, { avatar: 0 })
        await book.populate('comments')
        if (!book) {
            return res.status(400).json('No books found')
        }

        let owners = []
        book.comments.forEach(async(comment)=>{
            let user = await User.findOne({_id: comment.ownerId},{avatar: 0})
            comment.ownerId = {email: user.email, name: user.name}
            console.log(comment)
        })
        // console.log(owners)
        res.json({data: book, comments:book.comments})
    } catch (e) {
        res.status(500).json()
    }
})

// Edit in books 
router.put('/update/:id', auth, async (req, res) => {

    // To check if value in valid values for updates
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'author', 'description', 'rate', 'price', 'amount']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).json({ error: 'error value for updates' })
    }
    const { id } = req.params
    const book = Book.findOne({ _id: id}, {avatar: 0})
    try {
        updates.forEach(update => book[update] = req.body[update])
        await book.save()
        res.status(200).json(book)
    } catch (e) {
        res.status(400).json(e)
    }
})



router.get('',  async (req, res) => {
    try {
        // To Ignore Avatar 
        const books = await Book.find({}, { avatar: 0 })
        res.json(books)
    } catch (e) {
        res.status(500).json()
    }
})

module.exports = router