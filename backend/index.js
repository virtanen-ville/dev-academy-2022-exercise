const express = require("express");
const app = express();
const fs = require("fs");
const { parse } = require("csv-parse");
const path = require("path");
const { stringify } = require("csv-stringify");
const postgres = require("./postgres");
const csvFunctions = require("./csvFunctions");
const cors = require("cors");
app.use(cors());

// // Endpoints to fetch data from farms with different granularities (by month, by metric)
// // Aggregate calculation endpoints, endpoint which returns monthly averages, min/max and other statistical analysis
// monthlyData = "Data";

// app.get("/", (req, res) => {
// 	res.send("<h1>Hello World!</h1>");
// });

// app.get("/api/monthly", (req, res) => {
// 	res.send(monthlyData);
// });

app.get("/api", (req, res) => {
	res.json({ message: "Hello from Node server!" });
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);

// ## Validation rules
// * Accept only temperature,rainfall and PH data. Other metrics should be discarded
// * Discard invalid values with next rules
// * pH is a decimal value between 0 - 14
// * Temperature is a celsius value between -50 and 100
// * Rainfall is a positive number between 0 and 500
// * Data may be missing from certain dates

//Put your csv-files path here...
const filesDirectory = path.join(__dirname, "/csvFiles/");

// Read the csv-files, parse and validate them. And finally write them to Postgres database.
csvFunctions
	.readDirectory(filesDirectory)
	.then((filenames) =>
		csvFunctions.writeFilesToDB(filenames, filesDirectory)
	);