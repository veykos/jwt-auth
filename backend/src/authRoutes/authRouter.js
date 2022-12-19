const router = require("express").Router();
const connection = require("../db");
const jwt = require("jsonwebtoken");
const { generateToken, checkToken } = require("../util/authFunctions");
const bcrypt = require("bcryptjs");

router.get("/users", (req, res, next) => {
  connection.query("SELECT username FROM users", (err, results) => {
    if (err) return console.log(err);
    res.json(results);
  });
});
router.post("/logout", (req, res) => {
  console.log(req.cookies);
  res.clearCookie("access_token", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  return res.sendStatus(204);
});

router.get("/secret", (req, res) => {
  if (req.cookies.access_token) {
    const token = req.cookies.access_token;
    const decipheredToken = checkToken(token);
    res.json(decipheredToken);
    console.log(decipheredToken);
  }
  console.log(req.cookies);
  return res.json({message:'No logged in user'})
});

router.post("/login", (req, res) => {
  const { username: usernameFromBody, password: passwordFromBody } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [usernameFromBody],
    (err, result) => {
      if (err) return console.log(err);
      if (result.length === 0) {
        return res.status(404).json({ error: "No such user found" });
      }
      const { username, password } = result[0];
      const doesPasswordMatchHash = bcrypt.compareSync(
        passwordFromBody,
        password
      );
      console.log(doesPasswordMatchHash);
      if (doesPasswordMatchHash) {
        const token = generateToken(username);
        return res
          .cookie("access_token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: 1200000,
          })
          .status(200)
          .json({ message: "Logged in succesfully" });
      } else {
        return res.status(404).json({ error: "Password incorrect" });
      }
    }
  );
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPass = bcrypt.hashSync(password, salt);
  connection.query(
    `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPass}')`,
    (err, result) => {
      if (err) return console.log(err);
      res.status(204);
    }
  );
});

module.exports = router;
