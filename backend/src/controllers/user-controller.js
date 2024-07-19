const {User, validate} = require("../models/User.js");
const bcrypt = require("bcryptjs");
const Bookings = require("../models/Bookings");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    return console.log(err);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ users });
};

const singup = async (req, res, next) => {
  try {
		const { error } = validate(req.body);
			if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: error });
	}
};

const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { password } = req.body;
  if ( !password && password === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  const hashedPassword = await bcrypt.hashSync(password);

  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      password: hashedPassword,
    });
  } catch (errr) {
    return console.log(errr);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  res.status(200).json({ message: "Updated Sucessfully" });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndRemove(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Something went wrong" });
  }
  return res.status(200).json({ message: "Deleted Successfully" });
};

const login = async (req, res, next) => {
  try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const token = user.generateAuthToken();
    
		res.status(200).send({ id :user.id ,data: token, message: "logged in successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
};

const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Bookings.find({ user: id })
      .populate("movie")
      .populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Unable to get Bookings" });
  }
  return res.status(200).json({ bookings });
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user });
};

const userExist = async(req,res,next) =>{
  try {
    const { email,personName, password} = req.params;
    console.log("email received "+email)
    const user = await User.findOne({ email });
    if (user) {
      res.json({ exists: true });
    } else {

      let name=personName;
      let userTocreate = new User({ name, email, password });
      let userCreated = await userTocreate.save();
      res.json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const dataService = async (req,res,next) =>{
  try {
		res.status(200).send({message: "Welcome to data service!" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
}


module.exports = { getAllUsers,singup,updateUser,deleteUser,getBookingsOfUser,getUserById,login,userExist,dataService };

