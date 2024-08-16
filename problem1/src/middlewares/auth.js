require("dotenv").config();
var jwt = require("jsonwebtoken");

const accessToken = process.env.ACCESS_SECRET_KEY;

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) {
    return res
      .status(401)
      .json({ messege: "Access Denied due to no token given" });
  }
  const token = header.split(" ")[1];

  try {
    const decode = jwt.verify(token, accessToken);

    //The req.user object is typically populated in this  middleware function that runs before your route handlers.
    // attaches the user information to req.user, making it available to subsequent route handlers.
    req.user = decode;
    next();
  } catch (err) {
    res.status(401).json({ messege: "Access Denied due to Invalid token" });
  }
};

module.exports = auth;
