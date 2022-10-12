const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt"); //npm install bcrypt

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body); //this is from the users.js validate joi which downloaded from joi library- We are validating if first name, last name, email password for login
    if (error)
      //error handling RAMI! fix this
      //if error return the 400 below with the first value of details which is message in this case
      return res.status(400).send({ message: error.details[0].message });

    //Find one person that matches our req.body.email
    const user = await User.findOne({ email: req.body.email }); //we find first user. see mongodb docs
    if (user)
      return res
        .status(409)
        .send({ message: "User with that email address already exists" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT)); //hashing password via encrypting
    const hashPassword = await bcrypt.hash(req.body.password, salt); //you are sending the email and password via req.body.email && req.body.password. We are hasing passowrd received from req.body with salt.

    await new User({ ...req.body, password: hashPassword }).save(); // destructuring the ...req.body and matching the USER SCHEMA password and converting it into haspassword/encrypted. It is being destructured to reqrite the password.
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//TESTING PURPOSES ONLY
router.get("/", async (req, res) => {
  try {
    //Find one person that matches our req.body.email
    const users = await User.find(); //we find first user. see mongodb docs

    res.status(201).send(users);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
