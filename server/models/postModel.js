const { required } = require('joi');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postTopic: {
        type: String,
        required: true
    },
    postContent: { 
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Post', postSchema)