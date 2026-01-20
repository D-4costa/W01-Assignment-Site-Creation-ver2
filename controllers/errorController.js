exports.throwError = async function (req, res, next) {
  throw new Error("Intentional Server Error")
}
