const jwt = require("jsonwebtoken");
const config = require("../config/EnvConfig");
const { userService } = require("../services/index");
const extractToken = (header) => {
  if (!header) return null;
  if (header.startsWith("Bearer ")) {
    return header.slice(7, header.length);
  }
  return header;
};

const validateToken = (req, res, next) => {
  const token = extractToken(req.headers["authorization"]);

  if (!token) {
    return res.status(401).json({
      message: "Auth token is not supplied",
    });
  }

  jwt.verify(token, config.jwt.secret, async (err, decoded) => {
    if (err) {
      console.error(err);
      return res.status(401).json({
        message: "Token is not valid",
      });
    }

    const id = decoded.userId;
    const user = await userService.findById(id);
    if (!user) {
      return res.status(401).json({
        message: "Token is not valid",
      });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  validateToken,
};
