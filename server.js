const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const app = express()

/* ---------- VIEW ENGINE ---------- */
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("layout", "layouts/layout")

/* ---------- STATIC FILES ---------- */
app.use(express.static("public"))

/* ---------- ROUTES ---------- */
const staticRoutes = require("./routes/static")
const inventoryRoutes = require("./routes/inventoryRoute")
const errorRoutes = require("./routes/errorRoute")

app.use("/", staticRoutes)
app.use("/inv", inventoryRoutes)
app.use("/", errorRoutes)

/* ---------- 404 HANDLER ---------- */
app.use((req, res, next) => {
  const error = new Error("Page Not Found")
  error.status = 404
  next(error)
})

/* ---------- GLOBAL ERROR HANDLER ---------- */
const { errorHandler } = require("./utilities/errorHandler")
app.use(errorHandler)

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
