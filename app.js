//=====================
//Express
//=====================
const express = require("express");
const app = express();

//=====================
//Sequelize
//=====================
const { Product, Category, sequelize } = require("./models").sequelize;
const { Op } = sequelize;

//=====================
//App Variables
//=====================
app.locals.appName = "Welcome to Mimir's Market";
app.locals.headerData = require("./helpers/headerValues");

//=====================
//Env/Dotenv
//=====================
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//=====================
//Body Parser
//=====================
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

//=====================
//Sessions/Cookies
//=====================
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET || "secret"]
  })
);

app.use((req, res, next) => {
  req.session.products = req.session.products || {};
  req.session.lastSearch = req.session.lastSearch || {};
  res.locals.session = req.session;
  next();
});

//=====================
//Flash Messages
//=====================
const flash = require("express-flash-messages");
app.use(flash());

//=====================
//Method Override
//=====================
const methodOverride = require("method-override");
const getPostSupport = require("express-method-override-get-post-support");

app.use(
  methodOverride(
    getPostSupport.callback,
    getPostSupport.options //{methods: ['POST', 'GET']}
  )
);

//=====================
//Referrer
//=====================
app.use((req, res, next) => {
  req.session.backUrl = req.header("Referer") || "/";
  next();
});

//=====================
//Public
//=====================
app.use(express.static(`${__dirname}/public`));

//=====================
//Logging
//=====================
const morgan = require("morgan");
const morganToolkit = require("morgan-toolkit")(morgan);

app.use(morganToolkit());

//=====================
//Routes
//=====================
const { home, login, products, cart, search, checkout } = require("./routers");

app.use("/login", login);

app.use((req, res, next) => {
  if (!req.session.user) {
    req.flash("notify", "Please log in.");
    res.render("welcome/login");
  } else {
    next();
  }
});

app.use("/checkout", checkout);
app.use("/products", products);
app.use("/cart", cart);
app.use("/search", search);
app.use("/login", login);
app.use("/", home);

//=====================
//Handlebars
//=====================
const expressHandlebars = require("express-handlebars");
const helpers = require("./helpers");

const hbs = expressHandlebars.create({
  helpers,
  partialsDir: "views/",
  defaultLayout: "application"
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//=====================
//Server
//=====================
const port = process.env.PORT || process.argv[2] || 3000;
const host = "localhost";

let args;
process.env.NODE_ENV === "production" ? (args = [port]) : (args = [port, host]);

args.push(() => {
  console.log(`Listening: http://${host}:${port}\n`);
});

if (require.main === module) {
  app.listen.apply(app, args);
}

//=====================
//Error Handling
//=====================
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err.stack) {
    err = err.stack;
  }
  res.status(500).render("errors/500", { error: err });
});

module.exports = app;
