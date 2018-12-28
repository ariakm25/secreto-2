const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}));

var User = require('./routes/user');
var Message = require('./routes/message');

app.use('/users', User);
app.use('/messages', Message);

app.set('view engine', 'ejs');

app.get('/login', function(req, res){
    res.render('users/login');
});

app.get('/register', function(req, res){
    res.render('users/register');
});

app.listen(3000,function(){
    console.log('Listening on port ' + 3000);
});
