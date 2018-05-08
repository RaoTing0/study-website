const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const route = require('./routes');

const app = express();

app.use(favicon(path.resolve(__dirname, "../public/favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", express.static(path.join(__dirname, "../public")));
app.use('/api', route);

app.set("port", process.env.PORT || 3000);

// 连接数据库
mongoose.connect("mongodb://localhost/recruit");
mongoose.connection
    .on("error", (err) => {
        console.log(err);
    })
    .once("open", function() {
        console.log("连接成功");
        app.listen(app.get("port"), err => {
            if (err) {
                throw err;
            }
            console.log("server start on port : " + app.get("port"));
        });
    });

module.exports = app;