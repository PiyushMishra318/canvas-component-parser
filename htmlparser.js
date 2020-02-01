const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 3002;
var htmlparser = require("htmlparser");
var html = require("htmlparser-to-html");
html.configure({ disableAttribEscape: true });
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function(req, res) {
  var handler = new htmlparser.DefaultHandler(function(error, dom) {
    if (error) console.log(err);
    else console.log("done");
  });
  var parser = new htmlparser.Parser(handler);
  var new_html = fs.readFileSync("index.html", { utf: 8 });
  parser.parseComplete(new_html);
  fs.writeFileSync("index4.html", html(handler.dom));
  res.sendFile(__dirname + "/index4.html");
});

app.listen(port);

console.log(`REST API server Stared on http://127.0.0.1:${port}`);
