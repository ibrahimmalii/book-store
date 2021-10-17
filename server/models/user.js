const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Email not valid')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate(value) {
            if (!value.toLowerCase().match()) {
                throw Error('Password not valid')
            }
        }
    },
    phone: {
        type: String,
        required: true,
        validate(value) {
            if (!value.toLowerCase().match()) {
                throw Error('Phone number not valid')
            }
        }
    },
    address: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 0) {
                throw Error('Age not valid')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
})

// Middle ware will run before saving or updating user

// 1- generate token ==> methods access instance
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'PASSWORD_KEY')

    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

//2- find user by credintioals ==> statics access model 
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw Error('Unable to login')
    }

    return user
}


//2- hash password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})

const User = mongoose.model('User', userSchema)

module.exports = User