const express = require("express");
const bodyParser = require("body-parser");
const postRoute = require("./routes/post_routes");
const app = express();
app.use(bodyParser.json());
app.use("/posts",postRoute);

module.exports = app;

