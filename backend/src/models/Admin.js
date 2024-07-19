const mongoose = require("mongoose") ;
const jwt = require("jsonwebtoken") ;
const Joi = require("joi") ;


const passwordComplexity = require("joi-password-complexity");
// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(32).toString('hex');


const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  addedMovies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Movie",
    },
  ],
});

adminSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, `${process.env.SECRET_KEY}` , {
		expiresIn: "7d",
	});
	return token;
};

const Admin =  mongoose.model("Admin", adminSchema);

const validate = (data) => {
	const schema = Joi.object({
		// _id:Joi.string().required().label("_id"),
		// firstName: Joi.string().required().label("First Name"),
		name: Joi.string().required().label("Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports =  { Admin, validate };
