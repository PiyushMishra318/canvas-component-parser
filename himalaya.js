const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3000;
const parse = require("himalaya").parse;
const stringify = require("himalaya").stringify;
const bodyParser = require("body-parser");
var json;
// app.get('/index.html', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/parse/html", (req, res) => {
  const html = fs.readFileSync("index.html", { encoding: "utf8" });
  json = parse(html);
  res.send(json);
});

app.get("/parse/json", (req, res) => {
  fs.writeFileSync(__dirname + "/index2.html", stringify(json));
  res.sendFile(__dirname + "/index2.html");
});

app.listen(port);

console.log(`REST API server Stared on http://127.0.0.1:${port}`);
