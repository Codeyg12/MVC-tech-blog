const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update({
      ...req.body,
      user_id: req.session.user_id,
    },
    {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    })
console.log("reSession:", req.params)
console.log("ReqParamsId:", req.params.id)
console.log("reqBody:", req.body)
console.log("UpdatePost:", updatePost)
    if (!updatePost) {
      res.status(404).json({ message: "No post found with that id" });
      return;
    }
    res.status(200).json(updatePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postDelete = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postDelete) {
      res.status(404).json({ message: "No post found with that id" });
      return;
    }
    res.status(200).json(postDelete);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
