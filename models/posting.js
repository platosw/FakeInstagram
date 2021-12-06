const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
}, {
    timestamps: true,
});

const postingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    img: {
        type: String,
    },
    imgURL: String,
    text: String,
    comment: [commentSchema],
}, {
    timestamps: true,
});


module.exports = mongoose.model('Posting', postingSchema);