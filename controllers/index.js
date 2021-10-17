//dependencies
const express = require('express');
const router = express.Router();
const Posting = require('../models/posting.js');
const User = require('../models/user.js');

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
    // console.log(Posting.userId.type);
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

// delete for comment
router.delete('/:id/comment', (req, res) => {
    Posting.findById(req.params.id, (err, posting) => {
        posting.comment[0].remove();
        posting.save((err) => {
            console.log(`removed!`);
        });
        res.redirect(`/${req.params.id}`);
    });
});

// update
router.put('/:id/edit', (req, res) => {
    Posting.findByIdAndUpdate(req.params.id, req.body, (error, updatePosting) => {
        res.redirect(`/${req.params.id}`);
    });
});

// update for comments (later)
router.put('/:id/comment/edit/:comment', (req, res) => {
    req.body.user = req.session.user;
    Posting.findById(req.params.comment, (error, posting) => {
        posting.comment.push(req.body);
        posting.save();
        res.redirect(`/${req.params.id}`);
    });
})


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

//create for comment
router.post('/:id', (req, res) => {
    req.body.user = req.session.user;
    Posting.findById(req.params.id, (error, posting) => {
        posting.comment.push(req.body);
        posting.save();
        res.redirect(`/${req.params.id}`);
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

// edit comment
router.get('/:id/comment/edit/:comment', async (req, res) => {
    const user = await User.findById(req.session.user);
    const posting = await Posting.findById(req.params.id);
    Posting.findById(req.params.comment, (error, data) => {
        res.render('editcomment.ejs', {
            user,
            comment: data,
            posting
        });
    });
})

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