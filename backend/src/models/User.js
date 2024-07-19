const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
// const { v4: uuidv4 } = require("uuid");

const passwordComplexity = require("joi-password-complexity");
const crypto = require("crypto");
const secretKey = crypto.randomBytes(32).toString("hex");
// const secretKey = secretKey

const Schema = mongoose.Schema;
const userSchema = new Schema({
  // _id:{ type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, secretKey, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    // _id: Joi.string().required().label("_id"),
    name: Joi.string().required().label("Name"),
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};

module.exports = { User, validate,secretKey };
