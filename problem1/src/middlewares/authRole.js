const authRole = (...roles) => {
  return (req, res, next) => {
    //some useful for checking two arrays if any element is including
    if (!req.user.role.some((role) => roles.includes(role))) {
      return res.status(403).json({ messege: "Role authorization is failed" });
    }
    next();
  };
};

module.exports = authRole;
