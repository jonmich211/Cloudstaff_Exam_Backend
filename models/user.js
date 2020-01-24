const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
//const config = require('../models/database');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        required: true
    }
        
})

const User = module.exports = mongoose.model('User', UserSchema);