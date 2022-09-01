const router = require("express").Router();
const { Post } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const userPosts = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const posts = userPosts.map((post) => post.get({ plain: true }));
    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/update/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);
    const soloPost = postData.get({ plain: true });

    res.render("editing", {
      soloPost,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
