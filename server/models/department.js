const mongoose = require('mongoose')
const Schema = mongoose.Schema

const departmentSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        min: [10, 'minimum length is 10 characters'],
        max: [200, 'maximum length is 200 characters']
    }
})

// Set relations between this and books
departmentSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'departments'
})

const Department = mongoose.model('Department', departmentSchema)

module.exports = Department