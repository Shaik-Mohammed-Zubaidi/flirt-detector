const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const axios = require("axios");
const Query = require("./models/queryModel");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/v1/query", async (req, res) => {
	try {
        console.log("Inside /api/v1/query")
		// reading query data from the user
		const { userName, query } = req.body;

		console.log("userName", userName);
		console.log("query", query);

		if (!userName || !query) {
			return res.status(400).json({ err: "Please fill all the fields" });
		}

		const newQuery = new Query({
			userName,
			query,
		});
		newQuery.save();
        const response = await axios.post(
            "http://127.0.0.1:5001/api/query",
            { query }
        );
        console.log("Response:", response.data);
        const { result: isFlirty, class_name } = response.data;

		res.json({ isFlirty, class_name });
	} catch (error) {
		res.status(500).json({ err: error.message });
	}
});

// mongodb://localhost:27017
mongoose
	.connect(process.env.MONGODB_CONNECTION_STRING)
	.then((_) => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Exception Occured", err));

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
