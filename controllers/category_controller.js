const models = require("../models");
const validator = require("fastest-validator");

function createCategory(req, res) {
  const schema = {
    name: { type: "string", optioanl: false },
  };
  const v = new validator();
  const validationResponse = v.validate(req.body, schema);
  if (validationResponse != true) {
    res.status(401).json({
      message: "Validation Failed",
      error: validationResponse,
    });
  } else {
    models.Category.create(req.body)
      .then((result) => {
        res.status(201).json({
          message: "Category Created Successfully",
          result: result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Internal Server Error",
          error: error,
        });
      });
  }
}
function showAll(req, res) {
  models.Category.findAll()
    .then((result) => {
      if (result.length == 0) {
        res.status(404).json({
          message: "No Categories Found",
        });
      } else {
        res.status(200).json(result);
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
  createCategory: createCategory,
  showAll: showAll,
};
