const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment