const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();

// View engine
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "layouts/layout");

// Static files
app.use(express.static("public"));

// Routes
const staticRoutes = require("./routes/static");
app.use("/", staticRoutes);

// Server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
