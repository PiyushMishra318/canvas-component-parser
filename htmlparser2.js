const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3003;
var htmlparser2 = require("htmlparser2");
var html = require("htmlparser-to-html");
const bodyParser = require("body-parser");
const flatted = require("flatted");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  var handler = new htmlparser2.DomHandler(function(error, dom) {
    if (error) console.log(err);
    else console.log("done");
  });
  var parser = new htmlparser2.Parser(handler);
  var new_html = fs.readFileSync("index.html", { utf: 8 });
  parser.parseComplete(new_html);
  fs.writeFileSync("index5.html", html(handler.dom));
  res.sendFile(__dirname + "/index5.html");
});

app.listen(port);

console.log(`REST API server Stared on http://127.0.0.1:${port}`);
