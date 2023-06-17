const userRouter = require("./user.routes");
const docRouter = require("./doc.routes");
const oauthRouter = require("./oauth.routes");
const { BASEPATH } = require("../configs/constants.configs");
const { isLoggedIn } = require("../controllers/user.controller");

module.exports = (app) => {
  app.use(`${BASEPATH}/protected`, isLoggedIn);
  app.use(`${BASEPATH}/auth/google`, oauthRouter);
  app.use(`${BASEPATH}/users`, userRouter);
  app.use(`${BASEPATH}/docs`, docRouter);
  app.use(`${BASEPATH}/auth`, oauthRouter);
  app.use(`${BASEPATH}/profile`, userRouter); /* this could be to the dashboard */
};