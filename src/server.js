require("express-async-errors");
const {app} = require("./app");
const { logger } = require("./middlewares/errors.middlewares");
const { PORT } = require("./configs/constants.configs");

app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
});