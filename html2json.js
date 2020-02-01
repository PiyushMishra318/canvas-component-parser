const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3001;
var html2json = require("html2json").html2json;
var json2html = require("html2json").json2html;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  const html = fs.readFileSync("index.html", { encoding: "utf8" });
  json = html2json(html);
  new_file = json2html(json);
  fs.writeFileSync("index3.html", html);
  // res.send(json);
  res.sendFile(__dirname + "/index3.html");
});

app.listen(port);

console.log(`REST API server Stared on http://127.0.0.1:${port}`);
