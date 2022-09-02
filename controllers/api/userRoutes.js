const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body)

    res.session.save(() => {
      req.session.user_id = newUser.id
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Try again." });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.username = userData.username
      req.session.loggedIn = true;

      res
        .json({ user: userData, message: "You are now logged in" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
