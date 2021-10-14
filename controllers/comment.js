// 1. find post
// 2. push using req.body
// 3. post.comment.push(req.,body)

const express = require('express');
const router = express.Router();
const Posting = require('../models/posting.js');
const User = require('../models/user.js');

router.post('/:id/comment', (req, res) => {
    Posting.findById(req.params.id, (error, post) => {
        post.comment.push(req.body);
        post.save(() => {
            res.redirect('/:id');
        });
    });
});