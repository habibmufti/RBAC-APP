function errorHandler(err, req, res, next) {
  switch (err.name) {
    case "SequelizeValidationError":
      const errors = err.errors.map((el) => ({
        message: el.message,
        type: el.type,
      }));
      res.status(400).json({ errors });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      break;
    case "NotAuthenticated":
      res.status(401).json({ message: "Please login first" });
      break;
    case "Unauthorized":
      res.status(403).json({ message: "You are not authorized" });
      break;
    case "NotFound":
      res.status(404).json({ message: "Data not found" });
      break;
    case "InvalidLogin":
      res.status(400).json({ message: "Invalid email/phone or password" });
      break;
    default:
      res.send(err);
      break;
  }
}

module.exports = errorHandler;
