const router = require("express").Router();
const connection = require("../db");
const { generateToken, checkToken } = require("../util/authFunctions");
const bcrypt = require("bcryptjs");

// Endpoint that gets all usernames from the 'users' table in the database
router.get("/users", (req, res, next) => {
  connection.query("SELECT username FROM users", (err, results) => {
    if (err) return console.log(err); // log error and return early
    res.json(results); // send results as JSON response
  });
});

// Endpoint that clears the 'access_token' cookie
router.post("/logout", (req, res) => {
  // Very important!! To clear out a cookie it needs to be sent to the server, which means your front-end request
  // must have credentials attached. Otherwise the cookie is not sent and the server has nothing to clear.
  // Also, the settings of the cookie must match. So whatever options you set on the cookie on creating it in your
  // login route, you have to set the same options here on clearing it. Otherwise it will not go through.
  res.clearCookie("access_token", {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });
  // Finally sending a status 204 which has NO CONTENT, so we use sendStatus method
  return res.sendStatus(204); // send HTTP status code 204 (No Content)
});

// Endpoint that returns the deciphered JWT if the 'access_token' cookie is present
router.get("/secret", (req, res) => {
  // we check if a cookie with name access_token is sent with the incoming request, if not
  // we return only the message No logged in user; If we find such a cookie we check it,
  // and we send it back to the front end. This is the authorization part, you could have
  // some special roles set in the token such as role: admin, where you can check
  // if the user has access to certain parts of the website through the backend.
  // Front-end only authorization is not good, you should always have checks in place in the backend
  // as the backend should be the Single Source of Truth.
  if (req.cookies.access_token) {
    // get the 'access_token' cookie
    const token = req.cookies.access_token;
    // decipher the JWT
    const decipheredToken = checkToken(token);
    res.json(decipheredToken);
  }
  // return message if no 'access_token' cookie is present
  return res.json({message:'No logged in user'})
});

router.post("/login", (req, res) => {
  // destructuring assignment to extract 'username' and 'password' from the request body
  const { username: usernameFromBody, password: passwordFromBody } = req.body;
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [usernameFromBody],
    (err, result) => {
      if (err) return console.log(err); // log error and return early
      if (result.length === 0) {
        // return error if no user found with the given username
        return res.status(404).json({ error: "No such user found" });
      }
      // destructuring assignment to extract 'username' and 'password' from the result
      const { username, password } = result[0];
      // check if the password from the request body matches the hashed password in the database
      const doesPasswordMatchHash = bcrypt.compareSync(
        passwordFromBody,
        password
      );
      if (doesPasswordMatchHash) {
        // generate JWT if the passwords match
        const token = generateToken(username);
        // set the 'access_token' cookie and send success message as JSON response
        return res
          // set the settings of the cookie, careful what you set as this can cause the cookie
          // to not be saved in the browser
          .cookie("access_token", token, {
            httpOnly: false,
            secure: true,
            sameSite: "none",
            maxAge: 1200000,
          })
          .status(200)
          .json({ message: "Logged in succesfully" });
      } else {
        // return error if the passwords don't match
        return res.status(404).json({ error: "Password incorrect" });
      }
    }
  );
});

// Endpoint that signs up a new user by inserting their username and hashed password into the 'users' table
router.post("/signup", (req, res) => {
  // destructuring assignment to extract 'username' and 'password' from the request body
  const { username, password } = req.body;
  // generate salt for the password hash
  const salt = bcrypt.genSaltSync(10);
  // hash the password with the salt
  const hashedPass = bcrypt.hashSync(password, salt);
  // insert the new user into the 'users' table
  connection.query(
    `INSERT INTO users (username, password) VALUES ('${username}', '${hashedPass}')`,
    (err, result) => {
      if (err) {
        console.log(err)
        return res.sendStatus(500)
      }; // log error and return early
      res.status(204); // send HTTP status code 204 (No Content)
    }
  );
});

module.exports = router;
