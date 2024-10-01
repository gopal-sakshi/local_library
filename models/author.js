const { DateTime } = require("luxon");      //GOPAL author date-format
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AuthorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
});


/************************************ Virtuals ********************************/
AuthorSchema.virtual('name').get(function () {
    return this.family_name + ' ' + this.first_name;     // cant use ARROW Fns here; think WHY
});


AuthorSchema.virtual('lifespan').get(function () {        
    return ((this.date_of_birth ? this.date_of_birth.getFullYear() : '').toString() + '-' +
        (this.date_of_death ? this.date_of_death.getFullYear().toString() : ''));
});

AuthorSchema.virtual('date_of_birth_new').get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});


AuthorSchema.virtual('date_of_death_new').get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id;
});
/************************************ Virtuals ********************************/


module.exports = mongoose.model('Author', AuthorSchema);
// model() constructor takes two arguments -- collectionName & collectionSchema
  

