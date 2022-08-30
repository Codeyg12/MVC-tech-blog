const router = require("express").Router();
const { Comment, Post, User } = require("../models");

router.get("/", async (req, res) => {
  try {
    const everyPost = await Post.findAll({
      include: [User],
    });

    const posts = everyPost.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: User,
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ messgae: "No post found with that id" });
    }

    const post = postData.get({ plain: true });

    res.render("post", {
      post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  } else {
    res.render("login");
  }
});

module.exports = router;
