var mongoose = require('mongoose');
var todoSchema = new mongoose.Schema({
        text: {type: String, required: true }
    },
    {versionKey: false},
    {autoIndex: false},
    {collection: 'todos'}
);

module.exports = mongoose.model('Todo', todoSchema);
