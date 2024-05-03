const mongoose = require("mongoose");

const querySchema = new mongoose.Schema({
	userName: String,
	query: String,
});

const Query = mongoose.model("query", querySchema);

module.exports = Query;
