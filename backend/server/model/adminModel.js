const mongoose = require('mongoose')
const emailValidator = require('email-validator')

let adminSchema = new mongoose.Schema({

    username: {
        type: mongoose.SchemaTypes.String,
        index: { unique: true },
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: false,
        index: { unique: true },
        trim: true,
        validate: {
            validator: emailValidator.validate,
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    }
})

let Admin = module.exports = mongoose.model('admin', adminSchema)