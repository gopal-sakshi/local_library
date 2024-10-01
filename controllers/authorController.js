var Author = require('../models/author');
var async = require('async');
var Book = require('../models/book');

const { body, validationResult } = require('express-validator');


var authorList = (req, res) => {
    Author.find()
        .sort([['family_name', 'ascending']])
        .exec(function (err, list_authors) {            
            if (err) { return next(err); }            
            res.render('author_list', { title: 'Author List', author_list: list_authors });
        });
};

var authorDetail = function (req, res, next) {
    async.parallel({
        author: (callback) =>  { Author.findById(req.params.id).exec(callback) },
        authors_books: (callback) => { Book.find({ 'author': req.params.id }, 'title summary').exec(callback) },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.author == null) { // No results.
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        res.render('author_detail', { title: 'Author Detail', author: results.author, author_books: results.authors_books });
    });
};

var createAuthorMw = [    
    body('first_name').trim().isLength({ min: 1 }).escape().withMessage('First name must be specified.').isAlphanumeric().withMessage('First name has non-alphanumeric characters.'),
    body('family_name').trim().isLength({ min: 1 }).escape().withMessage('Family name must be specified.').isAlphanumeric().withMessage('Family name has non-alphanumeric characters.'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601().toDate(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601().toDate(),
];

var createAuthor = (req, res, next) => {
    const errors = validationResult(req);           // Extract the validation errors from a request.
    if (!errors.isEmpty()) {                        // errors present, render form again        
        res.render('author_form', { title: 'Create Author', author: req.body, errors: errors.array() });
        return;
    } else {      // Data from form is valid... Create an Author object        
        var author = new Author({
            first_name: req.body.first_name,
            family_name: req.body.family_name,
            date_of_birth: req.body.date_of_birth,
            date_of_death: req.body.date_of_death
        });
        author.save(function (err) {
            if (err) { return next(err); }                
            res.redirect(author.url);
        });
    }
}

exports.author_list = authorList;
exports.author_detail = authorDetail;
exports.author_create_get = function (req, res, next) { res.render('author_form', { title: 'Create Author' }); };
exports.author_create_post = [ ...createAuthorMw, createAuthor ];


exports.author_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

exports.author_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

exports.author_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

exports.author_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};
