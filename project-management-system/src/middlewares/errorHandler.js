const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥", err);

  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // 🟡 Mongoose invalid ID
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID";
  }

  // 🟡 Mongoose validation
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // 🟡 JWT invalid
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  // 🟡 JWT expired
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  res.status(statusCode).json({
    status: statusCode >= 400 && statusCode < 500 ? "fail" : "error",
    message,
  });
};

module.exports = errorHandler;