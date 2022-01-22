require("dotenv").config();
const mongoose = require("mongoose");

// connect to mongoDB
const connect = mongoose.connect(
	`mongodb+srv://admin-phumlani:${process.env.DB_PSWD}@cluster0.jt1kf.mongodb.net/todo_list?retryWrites=true&w=majority`
);

// database structure aka schema
const todoSchema = {
	content: String,
};

// database model
const Todo = mongoose.model("todo", todoSchema);

module.exports = connect;
module.exports = Todo;
