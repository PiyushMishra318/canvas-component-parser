const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const parse = require("himalaya").parse;
const child_process = require("child_process");
var bat = require.resolve("./batch/convert_to_react.bat");
var json;
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose
	.connect("mongodb://localhost:27017/TEST", {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log("Successfully connected to the database");
	})
	.catch(err => {
		console.log("Could not connect to the database. Exiting now...", err);
		process.exit();
	});

const Navs = mongoose.model(
	"Navs",
	mongoose.Schema({
		name: String
	})
);

app.get("/get/navs", (req, res) => {
	Navs.find().exec((err, navs) => {
		if (err) res.send(err);
		else res.json(navs);
	});
});

app.get("/create/navs", (req, res) => {
	var navs = [{
			name: "Home"
		},
		{
			name: "About"
		},
		{
			name: "Contact"
		},
		{
			name: "More"
		}
	];
	Navs.insertMany(navs, (err, navs) => {
		if (err) res.send(err);
		else res.json(navs);
	});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use("/js", express.static(__dirname));

app.get("/parse/:method", function(req, res) {
	switch (req.params.method) {
		case "html":
			//   console.log(require("./coot-parsers/html-parser")(json));
			res.send(require("./new_parser/html-parser")());
			break;
		case "react":
			var text = require("./coot-parsers/react-parser")(json);
			var blocks = text.split("wrapper");
			blocks[0] = blocks[0].substring(0, blocks[0].length - 1);
			var newblock = blocks[1].substring(1, blocks[1].length - 2);
			blocks[2] = blocks[2].substring(1, blocks[2].length);
			blocks[1] = `\n<div id="app"></div>\n<script crossorigin src="https://unpkg.com/react@16/umd/react.development.js" ></script>\n<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" ></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js"></script>\n`;
			var react_js = blocks[2].replace(
				"//replace",
				fs
				.readFileSync(__dirname + "/reacttxt.html", {
					encoding: "utf8"
				})
				.replace("REACT", newblock)
			);
			// fs.writeFileSync("reacttxt.js", react_js);
			new_block = blocks[0] + blocks[1] + react_js;
			// blocks[2].replace("REACT", newblock);
			fs.writeFileSync(__dirname + "/new_react.html", new_block);
			res.sendFile(__dirname + "/new_react.html");
			break;
		case "react2":
			var ac = require("./coot-parsers/html-parser")(json);
			fs.writeFileSync(__dirname + "/conversion_folder/react.html", ac);
			child_process.exec(
				bat,
				function(error, stdout, stderr) {
					console.log(error, stdout, stderr);
					if (error || stderr) console.log(error || stderr);
					else {
						console.log(stdout);
					}
				},
				null,
				true
			);
			res.send(true);
			break;
		default:
			break;
	}
});

app.get("/", (req, res) => {
	const html = fs.readFileSync("template.html", {
		encoding: "utf8"
	});
	json = parse(html);
	res.send(json);
});

app.listen(port);

console.log(`REST API server Stared on http://127.0.0.1:${port}`);