// controllers/errorController.js
const triggerServerError = (req, res, next) => {
  const error = new Error("This is an intentional 500 error.")
  error.status = 500
  next(error) // ✅ Pass error to middleware
}

module.exports = {
  triggerServerError
}

