const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    author: {
        type: String,
        required: true,
        trim: true,
        min: [5, 'minimum length is 5 characters'],
        max: [50, 'maximum length is 50 characters']
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        // required: true,
        trim: true,
        lowercase: true,
        min: [10, 'Minimum length is 10 characters']
    },
    avatar: {
        type: Buffer,
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },
    comments: [{
        comment: {
            type: mongoose.Schema.Types.ObjectId,
            trim: true,
            lowercase: true,
            min: [5, 'minimum length is 4 characters'],
            max: [500, 'maximum length is 500 character'],
            ref: 'Comment'
        }
    }]
}, {
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
