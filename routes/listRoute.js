const express = require("express");
const bodyParser = require("body-parser");
const route = express.Router();
const getDate = require("../routes/date.js");
const connect = require("../mongoDB/db.js");
const Todo = require("../mongoDB/db.js");
const mongoose = require("mongoose");

route.use(bodyParser.urlencoded({ extended: true }));
route.use(bodyParser.json());

try {
	connect;
} catch (error) {
	alert(error);
}

let items = [];
let workItems = [];

const item1 = new Todo({
	content: "Welcome to your todo list",
});
const item2 = new Todo({
	content: "Hit the + button to add a new item",
});
const item3 = new Todo({
	content: "<-- Hit this to delete an item",
});

const defaultItem = [item1, item2, item3];

route.get("/", (req, res) => {
	let day = getDate();

	Todo.find({}, function (err, foundItems) {
		if (foundItems.length === 0) {
			Todo.insertMany(defaultItem, (err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("Successfully saved defaults to the DB");
				}
			});

			res.redirect("/");
		} else {
			res.render("list", {
				listTitle: day,
				newListItems: foundItems,
			});
		}
	});
});

route.post("/", (req, res) => {
	const todo = req.body.newItem;

	const item = new Todo({
		content: todo,
	});

	item.save();
	res.redirect("/");

	// if (req.body.list === "Work") {
	// 	workItems.push(item);
	// 	res.redirect("/work");
	// } else {
	// 	items.push(item);
	// 	res.redirect("/");
	// }
});

route.post("/delete", (req, res) => {
	const checkedItemId = req.body.checkbox;

	if (mongoose.Types.ObjectId.isValid(checkedItemId)) {
		Todo.findByIdAndRemove(checkedItemId, (err) => {
			if (!err) {
				console.log("Successfully removed item from the DB");
			} else {
				console.log(err);
			}

			res.redirect("/");
		});
	}

	console.log(checkedItemId);
});

route.get("/work", (req, res) => {
	res.render("list", {
		listTitle: "Work List",
		newListItems: workItems,
	});
});

module.exports = route;
