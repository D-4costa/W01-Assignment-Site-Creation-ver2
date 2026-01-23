const express = require("express")
const expressLayouts = require("express-ejs-layouts")
const path = require("path")

const app = express()

/* ---------- VIEW ENGINE ---------- */
app.use(expressLayouts)
app.set("view engine", "ejs")
app.set("layout", "layouts/layout")

/* ---------- STATIC FILES ---------- */
app.use(express.static(path.join(process.cwd(), "public")))

/* ---------- ROUTES ---------- */
const staticRoutes = require(path.join(process.cwd(), "routes/static"))
const inventoryRoutes = require(path.join(process.cwd(), "routes/inventoryRoute"))
const errorRoutes = require(path.join(process.cwd(), "routes/errorRoute"))

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
const { errorHandler } = require(
  path.join(process.cwd(), "utilities/errorHandler")
)
app.use(errorHandler)

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5500
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
