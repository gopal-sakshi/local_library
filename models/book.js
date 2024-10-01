var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// import { Schema as _Schema, model } from 'mongoose'; var Schema = _Schema;          // ES6 format

var BookSchema = new Schema({
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    summary: { type: String, required: true },
    isbn: { type: String, required: true },
    genre: [ { type: Schema.Types.ObjectId, ref: 'Genre' } ]
});

/****************************** Virtuals ********************************/
BookSchema.virtual('url').get(function () {
    return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);

