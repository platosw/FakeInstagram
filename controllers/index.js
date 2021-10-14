//dependencies
const express = require('express');
const router = express.Router();
const Posting = require('../models/posting.js');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');

// index
// router.get('/', (req, res) => {
//     console.log(req.session.user);
//     Posting.find({}, (error, allPostings) => {
//         res.render('home.ejs', {
//             user: req.session.user,
//             postings: allPostings,

//         });
//     });
// });

// const query = req.session.user ? {
//     author: req.session.user
// } : {};
// Meds.find(query, (err, meds)




router.get('/', async (req, res) => {
    const user = await User.findById(req.session.user);
    const postings = await Posting.find({});
    console.log(user);
    res.render('home.ejs', {
        user,
        postings
    });
});

// new
router.get('/new', async (req, res) => {
    const user = await User.findById(req.session.user);
    const postings = await Posting.find({});
    res.render('new.ejs', {
        user,
        postings
    });
});

// delete
router.delete('/:id', (req, res) => {
    Posting.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/');
    });
});

// update
router.put('/:id/edit', (req, res) => {
    Posting.findByIdAndUpdate(req.params.id, req.body, (error, updatePosting) => {
        res.redirect(`/${req.params.id}`);
    });
});

// update for comments (later)



// create
router.post('/', (req, res) => {
    Posting.create(req.body, (error, createPostings) => {
        res.redirect('/');
    });
});

// create for login
router.post('/', (req, res) => {
    Posting.create(req.body, (error, createPostings) => {
        res.redirect('/');
    });
});

// edit
router.get('/:id/edit', async (req, res) => {
    const user = await User.findById(req.session.user);
    Posting.findById(req.params.id, (error, findPosting) => {
        res.render('edit.ejs', {
            user,
            posting: findPosting,
        });
    });
});

// show
router.get('/:id', async (req, res) => {
    const user = await User.findById(req.session.user);
    Posting.findById(req.params.id, (err, posting) => {
        res.render('show.ejs', {
            user,
            posting
        });
    });
});

// exports module
module.exports = router;