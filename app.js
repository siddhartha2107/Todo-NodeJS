var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//template engine
app.set('view engine','ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app);

//listen to port 3000
app.listen(3001);
console.log('Port is 3001');