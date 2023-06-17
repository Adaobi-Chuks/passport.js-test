const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const {DATABASE_URI, MESSAGES} = require("./constants.configs");

module.exports = () => {
    mongoose.connect(DATABASE_URI)
        .then(() => {
            console.log(MESSAGES.DATABASE.CONNECTED);
        })
        .catch((err) => {
            console.log(MESSAGES.DATABASE.ERROR, err);
        });
}