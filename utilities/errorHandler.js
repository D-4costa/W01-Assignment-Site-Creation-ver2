exports.errorHandler = (err, req, res, next) => {
  console.error(err)

  res.status(err.status || 500).render("errors/error", {
    title: err.status === 404 ? "Page Not Found" : "Server Error",
    message: err.message,
  })
}
