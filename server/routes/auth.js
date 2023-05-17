const router = require("express").Router();
const myQuery = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;
    if (!first_name || !last_name || !username || !password)
      return res.status(400).json({ error: true, message: "missing some info" });

    // check for taken username
    const users = await myQuery(`SELECT username FROM user WHERE username = "${username}"`)
    console.log(users)
    if (users.length)
      return res.status(400).json({ err: true, msg: 'username is token' })


    // create hashed password
    const hash = await bcrypt.hash(password, 10);

    //creaye final query 
    const q = `INSERT INTO user (first_name, last_name, username, password) 
       VALUES ("${first_name}", "${last_name}", "${username}", "${hash}")`;

    // save to db
    await myQuery(q)
    res.status(201).json({ err: false, msg: "use added succefly" });


  } catch (err) {
    console.log(err)
    res.status(500).json({ err: true, message: err.message })
  }
});



router.post("/login", async (req, res) => {
  try {

    // destructuring
    const { username, password } = req.body;

    //make sure you have all the info you need
    if (!username || !password)
      return res.status(400).json({ error: true, message: "missing some info" });

    //get the right user from the db
    const q = `SELECT * FROM user WHERE username = "${username}"`;
    const users = await myQuery(q)

    if (!users.length)
      return res.status(400).json({ err: true, msg: "user not found" });

    const user = users[0];
    // make sure the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ err: true, msg: "wrong password" });

    // sign token
    // const token = jwt.sign({ ...user, password: "not this time, sir" }, process.env.TOKEN_SECRET)

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.TOKEN_SECRET);

    // return the token to the user
    res.json({ err: false, token, name: user.first_name, role: user.role })

    // catch
  } catch (err) {
    console.log(err)
    res.status(500).json({ err: true, msg: err })
  }

});

module.exports = router
