function getDate() {
	let today = new Date();

	let options = {
		weekday: "long",
		day: "numeric",
		month: "long",
	};

	return today.toLocaleDateString("en-GB", options);
}

module.exports = getDate;
