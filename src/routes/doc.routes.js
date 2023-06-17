const express = require("express");
const docRouter = express.Router();

docRouter.get("/", async (req, res) => {
    res.redirect("");
});

module.exports = docRouter;