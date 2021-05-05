const express = require('express');
const Todo = require("../../models/kratodo/Todo");
const router = express.Router();

router.post('/', async(req,res) => {
	if(req.session.email){
		try{
			const todo = await Todo.create(req.body);
			res.send({todo});
		}catch(err){
			res.status(400).send({error: `Impossible to create a todo: ${ err }`});
		}
	} else{
		res.json({message: "User not authenticated"})
	}
});

router.get('/', async(req, res) => {
	if(req.session.email){
		try{
			const todos = await Todo.find();
			res.send({todos});
		}catch(err){
			res.status(400).send({error: `Impossible to find all todo's.`});
		};
	} else{
		res.json({message: "User not authenticated"})
	}
});

router.get("/finished", async(req,res) => {
	if(req.session.email){
		try{
			const todos = await Todo.find({status: 'done'})
			res.send({todos})
		}catch(err){
			console.log(err)
			res.json({error: err})
		}
	}else{
		res.json({message: "User not authenticated"})
	}
})

router.get("/unfinished", async(req,res) => {
	if(req.session.email){
		try{
			const todos = await Todo.find({status: 'todo'})
			res.send({todos})
		}catch(err){
			console.log(err)
			res.json({error: err})
		}
	}else{
		res.json({message: "User not authenticated"})
	}
})


module.exports = router;