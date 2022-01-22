const express = require("express");
const route = require("./routes/listRoute");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));

app.set("view engine", "ejs");

const port = 3000;
app.use("/", route);

app.use("/", route);

app.use("/", route);

app.listen(port, () => {
	console.log(`Server has started on port ${port}`);
});
