var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connecting to db
mongoose.connect('mongodb://###:###@ds117145.mlab.com:17145/todo');

//create a schema
var todoSchema = new mongoose.Schema({
	item: String
});

//todo Model
var Todo = mongoose.model('Todo',todoSchema);
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
	app.get('/todo',function(req,res){
		//get data and pass to view
		Todo.find({},function(err,data){
			if(err)
				throw err;
			res.render('todo',{todos:data});
		});
		
	});
	app.post('/todo',urlencodedParser,function(req,res){
		//get data from view and add to mongodb
		var newTodo = Todo(req.body).save(function(err,data){
			if(err)
				throw err;
			res.json(data);
		});
	});
	app.delete('/todo/:item',function(req,res){
		//delete requested item form mongoDB
		Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
			if(err)
				throw err;
			res.json(data);
		});
		
		// data=data.filter(function(todo){
		// 	return (todo.item.replace(/ /g,'-')!==req.params.item);
		// });
	});
};