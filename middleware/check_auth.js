const jwt = require("jsonwebtoken");
function checkAuth(req, res, next) {
  console.log(req.headers.authorization.split(" ")[1]);
  try {
    const token = req.headers.authorization.split(" ")[1]; // bearer 9348#$940e0439
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedToken);
    // console.log(req.userData);
    // req.userData = decodedToken;
    // console.log(req.userData);
    // req.user = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({
      message: "Do not have privelliges to access",
      error: error,
    });
  }
}
module.exports = {
  checkAuth: checkAuth,
};
