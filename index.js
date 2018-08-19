var express = require('express')
var todos = require('./routes/todos');
var users = require('./routes/users');
var logger = require('morgan')
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express()

var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
/* FOR CORS */
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.header("Access-Control-Request-Method", "*")
    res.header("Access-Control-Max-Age", "1728000")
    next()
})

app.use('/todos', todos); //1 params

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});



app.use('/users', users); //1 params


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
