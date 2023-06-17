// Packages
const { json, urlencoded } = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Modules
const { errorMiddleware } = require("./errors.middlewares");
const indexRoutes = require("../routes/index.routes");
const { MAXAGE, COOKIE_SECRET } = require("../configs/constants.configs");
require('../configs/database.configs')();
require('../configs/passport.config');

module.exports = (app) => {
  app.use(morgan('dev'));
  app.use(cors());
  app.use(json());
  app.use(urlencoded());  
  app.use(cookieParser());
  // Initialize passport
  app.use(
    session({
      name:'connect.sid',
      secret: process.env.COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: MAXAGE,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  indexRoutes(app);
  app.use(errorMiddleware);
};