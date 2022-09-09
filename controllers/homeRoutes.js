const router = require("express").Router();
const { Comment, Post, User } = require("../models");
const withAuth = require("../utils/auth");

// Pulls all the posts 
router.get("/", async (req, res) => {
  try {
    const everyPost = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
    });

    // Serialize the data for readability
    const posts = everyPost.map((post) => post.get({ plain: true }));
    posts.reverse();

    // Pass the info into the template
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Grabs a single post 
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!postData) {
      res.status(404).json({ messgae: "No post found with that id" });
      return;
    }

    const post = postData.get({ plain: true });

    res.render("post", {
      ...post,
      loggedIn: req.session.loggedIn,
      loggedIn: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders the dashboard page when the user is signed in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userInfo = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Post }, { model: Comment }],
    });

    const user = userInfo.get({ plain: true });

    res.render("dashboard", {
      ...user,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.redirect("login");
  }
});

// Renders a page to update/edit the post
router.get("/post/update/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render("editing", {
      ...post,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders a login page
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.render("login");
  }
});

// Renders a signup page
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  } else {
    res.render("signup");
  }
});

module.exports = router;
