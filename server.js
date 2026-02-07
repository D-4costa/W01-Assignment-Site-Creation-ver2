const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

const utilities = require("./utilities/index.js");

/* ---------- ROUTE IMPORTS ---------- */
const staticRoutes = require(path.join(process.cwd(), "routes/static"));
const inventoryRoutes = require("./routes/inventoryRoute.js");
const accountRoute = require("./routes/accountRoute.js");

/* ---------- VIEW ENGINE ---------- */
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

/* ---------- STATIC FILES ---------- */
app.use(express.static(path.join(process.cwd(), "public")));

/* ---------- BODY PARSERS ---------- */
// Support form submissions and JSON payloads for update routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ---------- SESSION MIDDLEWARE ---------- */
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  }),
);

/* ---------- GLOBAL NAV MIDDLEWARE ---------- */
app.use(async (req, res, next) => {
  try {
    const nav = await utilities.getNav();
    res.locals.nav = nav;
  } catch (e) {
    // Fallback nav if DB fails
    res.locals.nav =
      "<ul>" + '<li><a href="/" title="Home page">Home</a></li>' + "</ul>";
  }
  next();
});

// Express Messages Middleware
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

// Cookie parser
app.use(cookieParser());
// JWT checker
app.use(utilities.checkJWTToken);

/* ---------- Controllers ---------- */
const baseController = require("./controllers/baseController");

/* ---------- ROUTES ---------- */

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome));
const errorRoutes = require(path.join(process.cwd(), "routes/errorRoute"));

app.use("/", staticRoutes);
app.use("/inv", inventoryRoutes);
app.use("/account", accountRoute);
app.use("/", errorRoutes);
app.use(async (req, res, next) => {
  next({
    status: 404,
    message: "Unfortunately, we don't have that page in stock.",
  });
});

/* ---------- 404 HANDLER ---------- */
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav();
  console.error(`Error at: "${req.originalUrl}": ${err.message}`);
  console.dir(err);
  if (err.status == 404) {
    message = err.message;
  } else {
    message = "Oh no! There was a crash. Maybe try a different route?";
  }
  res.render("errors/error", {
    title: err.status || "Server Error",
    message,
    nav,
  });
});

/* ---------- GLOBAL ERROR HANDLER ---------- */
const { errorHandler } = require(
  path.join(process.cwd(), "utilities/errorHandler"),
);
app.use(errorHandler);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5501;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
