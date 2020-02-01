const express = require("express");
const app = express();
const port = process.env.PORT || 3005;
const bodyParser = require("body-parser");
// app.get('/index.html', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/components", express.static("components"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/react.html");
});
app.listen(port);

console.log(`REST API server Stared on http://127.0.0.1:${port}`);
