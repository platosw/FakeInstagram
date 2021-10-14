const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
}, {
    timestamps: true,
});

const postingSchema = new Schema({
    img: {
        type: String,
    },
    imgURL: String,
    text: String,
    comment: commentSchema,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});


module.exports = mongoose.model('Postings', postingSchema);