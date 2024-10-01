`Schema types`
- Most of them are self-explanatory
- type:     String, Date, 
- But there are exceptions

`ObjectId`
- it represents specific instances of a model in the database
- it contains the unique ID (_id) for the specified object
- <author & genre> property/field in book Schema
    { type: Schema.Types.ObjectId, ref: 'Author' }
    { type: Schema.Types.ObjectId, ref: 'Genre' }

`Mixed`
- arbitrary schema type

`[]`
- array of objects (without any specified type (or) array of string objects


`VALIDATION`
- Mongoose provides 
    <built-in> and <custom> validators, 
    <synchronous> and <asynchronous> validators.

`Built-in`
- Number Schema type        = required, min, max
- String Schema type        = required, enum, maxLength, minLength


`SCHEMA`
- schema = interface/template for a document
- there is authorSchmea... meaning all documents (in author collection) must match this schema...
- if there are 7 authors, there will be 7 author documents... 
    all those 7 author documents MUST conform to this schema

`Virtual properties`
- document properties that you can get & set 
- but that do not get persisted to MongoDB... 
- meaning these methods/properties on document dont get stored in db...
- bookSchmea has 5 properties  ------> title, author, genre, isbn, summary; 1 <virtual> url
- similarly, authorSchema also has 4 properties -----> firstname, lastname, bday, death_day; <virtuals> name, lifespan