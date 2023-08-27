const models = require("../models");
const validator = require("fastest-validator");
function createPost(req, res) {
  const post = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
    userId: 3,
  };
  const schema = {
    title: { type: "string", optional: false, max: 100 },
    content: { type: "string", optional: false },
    categoryId: { type: "number", optional: false },
    userId: { type: "number", optional: false },
  };
  const v = new validator();
  const validationResponse = v.validate(post, schema);
  if (validationResponse != true) {
    res.status(400).json({
      message: "Validation Failed",
      error: validationResponse,
    });
  } else {
    models.Post.create(post)
      .then((result) => {
        res.status(201).json({
          message: "Post Created Successfully",
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
}
function showOne(req, res) {
  const postId = req.params.id;
  models.Post.findOne({ where: { id: postId } })
    .then((result) => {
      console.log(result);
      if (!result) {
        res.status(404).json({
          message: "No post found",
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
function showAll(req, res) {
  models.Post.findAll({
    include: [
      {
        model: models.User,
        attributes: ["id", "name", "createdAt", "updatedAt"],
      },
    ],
  })
    .then((result) => {
      if (result.length !== 0) {
        res.status(200).json(result);
      } else {
        res.status(404).send("No posts found");
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Internal Sever Error",
        error: err,
      });
    });
}
function updatePost(req, res) {
  const postId = req.params.id;
  let lockupPost;
  const updatedPost = {
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
    categoryId: req.body.categoryId,
  };
  const schema = {
    title: { type: "string", optional: false, max: 100 },
    content: { type: "string", optional: false },
    categoryId: { type: "number", optional: false },
  };
  const v = new validator();
  const validationResponse = v.validate(updatedPost, schema);
  if (validationResponse != true) {
    res.status(400).json({
      message: "Validation Failed",
      error: validationResponse,
    });
  } else {
    models.Post.update(updatedPost, { where: { id: postId } })
      .then((result) => {
        lockupPost = result == 0 ? false : true;
        if (lockupPost == false) {
          res.status(404).send("Post not found");
        } else {
          res.status(200).json({
            message: "Post Updated Successfully",
            isSuccess: result,
            result: updatedPost,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Internal Server Error",
          error: err,
        });
      });
  }
}
function deletePost(req, res) {
  const postId = req.params.id;
  const userId = req.params.userId;

  models.Post.destroy({ where: { id: postId, userId: userId } })
    .then((result) => {
      if (result == 1) {
        res.status(200).json({
          message: "Post deleted Successfully",
          result:
            "Post no : " + postId + " for userId : " + userId + " deleted",
        });
      } else {
        res.status(404).json({
          message: "Either post not found or post not related to user",
        });
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
  createPost: createPost,
  showOne: showOne,
  showAll: showAll,
  updatePost: updatePost,
  deletePost: deletePost,
};
