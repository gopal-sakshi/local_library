var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
  import { Schema as _Schema, model } from 'mongoose';
  var Schema = _Schema;
  
  THIS IS ES6 FORMAT
  
*/
var BookSchema = new Schema(
  {
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.Types.ObjectId, ref: 'Genre'}]
  }
);

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);

/*
  Most Schema types are self-explanatory

  title: {type:String... }
  summary: {type:String... }

  EXCEPTIONS are

  a) ObjectId
    it represents specific instances of a model in the database
    it contains the unique ID (_id) for the specified object
    ... see 'author' just like title, summary... it is a key in bookSchema
    ... but its type is ====> Schema.Types.ObjectId and reference is =====> ref: 'Author'
    ... similarly for genre, =====> {type: Schema.Types.ObjectId, ref: 'Genre'}
    
    ... while a book can have 
        ONLY ONE author, 
        ONLY ONE title,
        ONLY ONE summary
    ... but it can have multiple genres... thats why genre is represented as array ====> genre: []
    ... each object/entry in genre must be of type ====> {type: Schema.Types.ObjectId, ref: 'Genre'}
  

  b) Mixed
    arbitrary schema type

  c) []
    array of objects (without any specified type (or) array of string objects

*/


/*

    VALIDATION

    Mongoose provides 
      built-in & custom validators, 
      synchronous & asynchronous validators.

    All Schema types = have built-in 'required' validator
    Number Schema type = min & max validators
    String Schema type = enum, maxLength, minLenght validators


    Example


    var breakfastSchema = new Schema({
      eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12,
        required: [true, 'Why no eggs?']
      },
      drink: {
        type: String,
        enum: ['Coffee', 'Tea', 'Water',]
      }
    });

    breakfastSchema is a schema...
    it has two keys ====> eggs & drink
    
    eggs    = 
      datatype (Number), 
      max value is 12,        (no error message if value is above 12)
      min value is 6          (error message 'Too few eggs')
      required... meaning, this field cant be empty

    drink   = 
    datatype (String)
    enum (means only accepted values are Coffee, Tea, Water)


*/


/*

    Understand like this... 
      schema = interface/template for a document
      there is authorSchmea... meaning all documents (in author collection) must match this schema...
      if there are 7 authors, there will be 7 author documents... all those 7 author documents MUST conform to this schema

    Virtual properties
    - document properties that you can get & set 
    - but that do not get persisted to MongoDB... meaning these methods/properties on document dont get stored in db...


    bookSchmea has 5 properties  ------> title, author, genre, isbn, summary
    it also has one virtual property ----> url (it just returns the url of the book)

    similarly, authorSchema also has 4 properties -----> firstname, lastname, bday, death_day...
    it has additional virtual properties like
      name ===> adds firstname & lastname
      lifespan ===> calculates age...
      ... but this name & lifespan dont get stored in mongoDB ...
*/