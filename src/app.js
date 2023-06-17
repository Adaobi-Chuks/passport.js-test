const express = require("express");
const indexMiddleware = require("./middlewares/index.middlewares");

const app = express();
indexMiddleware(app);

exports.app = app;