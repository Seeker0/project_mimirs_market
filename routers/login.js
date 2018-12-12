let router = require("express").Router();
let models = require("./../models");
let { User, sequelize } = models.sequelize;

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

router.post("/create", (req, res, next) => {
  let user = req.body.user;
  let userParams = {
    username: user.username,
    email: user.email,
    password: user.password
  };

  User.findOne({ where: { email: userParams.email } }).then(user => {
    if (user) {
      req.flash("notify", "User with that email already exists");
      res.render("welcome/login");
    } else {
      User.create(userParams)
        .then(user => {
          req.session.user = user.username;
          res.redirect("/");
        })
        .catch(e => next(e));
    }
  });
});

router.post("/", (req, res, next) => {
  let userInfo = req.body.user;

  User.findOne({ where: { username: userInfo.username } })
    .then(user => {
      if (!user) {
        req.flash("notify", "Invalid Username");
        res.render("welcome/login");
      } else if (user.password !== userInfo.password) {
        req.flash("notify", "Invalid Password");
        res.render("welcome/login");
      } else if (user.password === userInfo.password) {
        req.flash("notify", `Welcome ${userInfo.username}!`);
        req.session.user = {
          username: user.username,
          id: user.id
        };
        req.session.page = {
          current: 1,
          next: 2
        };
        res.redirect("/");
      }
    })
    .catch(e => next(e));
});

module.exports = router;
