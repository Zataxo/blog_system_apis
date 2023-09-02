const models = require("../models");
const bcryprtjs = require("bcryptjs");
const jsw = require("jsonwebtoken");
const validator = require("fastest-validator");

function signUp(req, res) {
  console.log(req.body);
  const userPass = req.body.password;
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({
          message: "Email already Exists",
        });
      } else {
        bcryprtjs.genSalt(10, function (err, salt) {
          bcryprtjs.hash(userPass, salt, function (err, hash) {
            const schema = {
              name: { type: "string", optional: false },
              email: { type: "string", optional: false },
              password: { type: "string", optional: false },
            };
            const userModel = {
              name: req.body.name,
              email: req.body.email,
              password: hash,
            };
            const v = new validator();
            const validationResponse = v.validate(userModel, schema);
            if (validationResponse != true) {
              res.status(400).json({
                message: "Validation Failed",
                error: validationResponse,
              });
            } else {
              models.User.create(userModel)
                .then((result) => {
                  res.status(201).json({
                    message: "User Created Successfully",
                    result: result,
                  });
                })
                .catch((err) => {
                  res.status(500).json({
                    message: "Internal Server Error",
                    error: err,
                  });
                });
            }
          });
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "internal Server Error",
        error: err,
      });
    });
}
// Login function
function login(req, res) {
  // console.log(req.body);
  models.User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      //   console.log(user);
      if (user == null) {
        res.status(401).json({
          message: "Invaild Email",
        });
      } else {
        bcryprtjs.compare(
          req.body.password,
          user.password,
          function (err, result) {
            // console.log(result);
            if (result) {
              jsw.sign(
                // {payload,secret,expiration,callback function}
                {
                  email: req.body.email,
                  userId: user.id,
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "24h",
                },
                function (err, token) {
                  res.status(200).json({
                    message: "Authenticated!!!",
                    token: token,
                    userModel: user,
                  });
                }
              );
            } else {
              res.status(401).json({
                message: "Invaild Password",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    });
}
module.exports = {
  signUp: signUp,
  login: login,
};
