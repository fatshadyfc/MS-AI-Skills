// Create web server    
var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user');
var checkLogin = require('../middlewares/check').checkLogin;

// POST /comments
// Create a comment
router.post('/', checkLogin, function(req, res, next) {
    var author = req.session.user._id;
    var postId = req.fields.postId;
    var content = req.fields.content;

    // Check parameters
    try {
        if (!content.length) {
            throw new Error('Please enter the comment content');
        }
    } catch (e) {
        req.flash('error', e.message);
        return res.redirect('back');
    }

    // Create a comment object
    var comment = {