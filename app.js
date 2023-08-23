const express = require("express");
const bodyParser = require("body-parser");
const postRoute = require("./routes/post_routes");
const commentRoute = require("./routes/comment_routes");
const app = express();
app.use(bodyParser.json());
app.use("/posts",postRoute);
app.use("/comments",commentRoute);

module.exports = app;

