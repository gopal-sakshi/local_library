var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/catalog');
});

module.exports = router;

/*

  Ultimately we might have pages to
    show lists & detail information for books, genres, authors, bookinstances, 
    create, update, delete records. 
  That's a lot to document in one article. 
  Therefore we setup our routes & controllers that return data to end user
  
  
  A route is a section of Express code that associates 
    an HTTP verb (GET, POST, PUT, DELETE, etc.)
    a URL path/pattern
    a function that is called to handle that pattern.

  There are several ways to create routes. 
    For this tutorial we're going to use the "express.Router" middleware


*/