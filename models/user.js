var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
        email: {type: String, required: true },
        password: {type: String, required: true},
        username: {type: String, required: true}
    },
    {versionKey: false},
    {autoIndex: false},
    {collection: 'users'}
);

module.exports = mongoose.model('User', userSchema);
