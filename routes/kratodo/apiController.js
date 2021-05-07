const express = require('express');
const authmiddle = require('../../middleware/kratodo/auth');
const Todo = require("../../models/kratodo/Todo");
const User = require('../../models/kratodo/User');
const router = express.Router();

router.post('/', async(req,res) => {
	if(Object.keys(req.body).includes('userID')){
		if(Object.keys(req.body).includes('title')){
			try{
				const user = await User.findOne({_id: req.body.userID})
				const todo = await Todo.create(req.body);
				await User.updateOne({_id: user._id}, {$push: { todos: todo._id}})
				res.status(201).json({todo});
			}catch(err){
				res.status(400).send({error: `Impossible to create a todo: ${ err }`});
			}
		} else{
			res.status(406).json({error: "A title is mandatory"})
		}
	} else{
		res.status(511).json({message: "User not authenticated"})
	}
});

router.get('/', async (req, res) => {
	try {
		if(Object.keys(req.body).includes('userID')){
			const user = await User.findOne({_id: req.body.userID})
			const todos = await Todo.find({_id: {$in: user.todos}})
			res.status(200).json(todos)			
		}
	} catch (error) {
		console.log(error)
	}
})

router.get("/finished/", async(req,res) => {
	if(Object.keys(req.body).includes('userID')){
		try{
			const user = await User.findOne({_id: req.body.userID})
			const todos = await Todo.find({_id: { $in: user.todos }, status: 'done'});
			res.status(200).json({todos});
		}catch(err){
			console.log(err)
			res.json({error: err})
		}
	}else{
		res.status(511).json({message: "User not authenticated"})
	}
})

router.get("/unfinished/", async(req,res) => {
	if(Object.keys(req.body).includes('userID')){
		try{
			const user = await User.findOne({_id: req.body.userID})
			const todos = await Todo.find({_id: { $in: user.todos }, status: 'todo'});
			res.status(200).json({todos});
		}catch(err){
			console.log(err)
			res.json({error: err})
		}
	}else{
		res.status(511).json({message: "User not authenticated"})
	}
})

router.delete('/:todoId/', async (req, res) => {
	if(Object.keys(req.body).includes('userID')){
		let user = await User.findOne({_id: req.body.userID})
		if(user && user.isLogged){
			if(Object.keys(req.params).includes('todoId')){
				const id = req.params.todoId
				const todo = await Todo.findOne({_id: id})
				if(todo){
					if(user.todos.includes(todo._id)){
						await Todo.deleteOne({_id: id})
						user = await User.findOneAndUpdate({_id: user._id}, {$pull: {todos : todo._id}}).lean()						
						res.status(200).send()
					} else{
						res.status(401).json({error: `This todo don't belong to ${user.name}`})
					}
				} else{
					res.status(404).json({error: `Todo with this given id doesn't exists`})
				}
			} else{
				res.status(406).json({error: "Invalid payload"})
			}
		} else{
			res.status(401).json({error: "Login first"})
		}
	} else{
		res.status(401).json({error: "Login first"})
	}
});

router.put('/:todoId/', async(req, res) => {
	if(Object.keys(req.body).includes('userID')){
		//deleting UserID to not be included in mongo document
		delete req.body.userID
		const response = await Todo.updateOne({_id: req.params.todoId}, req.body)
		res.status(200).json({response})
	} else{
		res.status(401).json({error: "Login first"})
	}
})


module.exports = router;