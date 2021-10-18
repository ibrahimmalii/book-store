const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    // author: {
    //     type: String,
    //     required: true,
    //     trim: true,
    //     min: [5, 'minimum length is 5 characters'],
    //     max: [50, 'maximum length is 50 characters']
    // },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        min: [10, 'Minimum length is 10 characters']
    },
    img_source: {
        file: {
            type: Buffer,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        mimetype: {
            type: String,
            required: true
        }
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
    departments: [{
        department: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Department'
        }
    }],
    owners: [{
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
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
},{
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
