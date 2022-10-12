const mongoose = require("mongoose");
const jwt = require("jsonwebtoken"); //Read more about here https://www.npmjs.com/package/jsonwebtoken
const Schema = mongoose.Schema; //schema for mongodb
const passwordComplexity = require("joi-password-complexity"); //Creates a Joi object that validates password complexity. Read more here: https://www.npmjs.com/package/joi-password-complexity
const Joi = require("joi");

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//Generate an Authorization Token via methods that expires in 1 day
//jwt.sign(payload, secretOrPrivateKey, [options, callback])
//RAMI! come back to fix 256 encryption
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "1d",
  }); //sign async
  return token;
};

//Set "user" to mongoose model of userSchema on line 7
const User = mongoose.model("user", userSchema);

//Validate the incoming (data) from routes using the Joi library
const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate };
