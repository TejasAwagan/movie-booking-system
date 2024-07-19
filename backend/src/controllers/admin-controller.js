const { Admin, validate } = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res, next) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (admin)
      return res
        .status(409)
        .send({ message: "Admin with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new Admin({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "Admin created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const crypto = require("crypto");
    const secretKey = crypto.randomBytes(32).toString("hex");
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const token = admin.generateAuthToken();

    res
      .status(200)
      .send({ id: admin.id, data: token, message: "logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    return console.log(err);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
  return res.status(200).json({ admins });
};

const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};

module.exports = { addAdmin, adminLogin, getAdmins, getAdminById };
