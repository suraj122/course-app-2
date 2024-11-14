const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

// Authentication
const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403).json({ message: "Token not valid" });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(403).json({ message: "You're not authentcated" });
  }
};

module.exports = { SECRET_KEY, authentication };
