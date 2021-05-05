const mongoose = require('../../database/db');

const TodoSchema = new mongoose.Schema({
	title:{
		type: String,
		require: true,
	},
	description:{
		type: String,
	},
	status:{
		type: String,
		default:"todo"
	},
	createdAt:{
		type: Date,
		default:Date.now,
	}
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;