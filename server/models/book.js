const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    'name' : {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
