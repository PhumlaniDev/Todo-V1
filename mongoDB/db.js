require("dotenv").config();
const mongoose = require("mongoose");

// connect to mongoDB
const connect = mongoose.connect(`${process.env.DB_URL}`);

// database structure aka schema
const todoSchema = {
	content: String,
};

// database model
const Todo = mongoose.model("todo", todoSchema);

module.exports = connect;
module.exports = Todo;
