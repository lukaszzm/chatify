const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await Users.find(
      { _id: req.params.id },
      { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
    );
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

module.exports.getUserByName = async (req, res, next) => {
  try {
    const id = req.body.id;
    const input = req.params.input;

    const users = await Users.find(
      {
        $and: [
          {
            $expr: {
              $regexMatch: {
                input: {
                  $concat: ["$firstName", " ", "$lastName"],
                },
                regex: input,
                options: "i",
              },
            },
          },
          {
            _id: { $ne: id },
          },
        ],
      },
      { firstName: 1, lastName: 1, profileImage: 1 }
    );
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let fixedEmail = email.toLowerCase();
    const user = await Users.findOne({ email: fixedEmail });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const id = user._id.toString();
        let token;
        try {
          token = jwt.sign(id, process.env.JWT_TOKEN);
        } catch (err) {
          res.status(400).send("Something went wrong.");
        }
        res.send({ id, token });
      } else {
        res.status(400).send("Your password is incorrect.");
      }
    } else {
      res.status(400).send("Your mail is incorrect.");
    }
  } catch (err) {
    next(err);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const user = await Users.findOne({ email: email });
    if (user) throw new Error("This email is already used!");
    let profileImage = process.env.DEFAULT_PROFILE_PATH;
    if (req.file) profileImage = req.file.path;

    const newUser = new Users({
      email: email,
      password: bcrypt.hashSync(req.body.password, 12),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profileImage: profileImage,
    });

    newUser.save();
    const id = newUser._id.toString();
    let token;
    try {
      token = jwt.sign(id, process.env.JWT_TOKEN);
    } catch (err) {
      return res.status(400).send("Something went wrong.");
    }
    return res.send({ id, token });
  } catch (err) {
    next(err);
  }
};

module.exports.updateFirstName = async (req, res, next) => {
  try {
    const id = req.body.id;
    const newFirstName = req.params.firstName;
    await Users.findByIdAndUpdate(id, { firstName: newFirstName });
  } catch (err) {
    next(err);
  }
  return res.send("Success! Your first name has been updated.");
};

module.exports.updateLastName = async (req, res, next) => {
  try {
    const id = req.body.id;
    const newLastName = req.params.lastName;
    await Users.findByIdAndUpdate(id, { lastName: newLastName });
  } catch (err) {
    next(err);
  }
  return res.send("Success! Your last name has been updated.");
};

module.exports.updatePassword = async (req, res, next) => {
  try {
    const { id, currentPassword, newPassword } = req.body;
    const user = await Users.findOne({ _id: id });
    if (user) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (match) {
        await Users.findByIdAndUpdate(id, {
          password: bcrypt.hashSync(newPassword, 12),
        });
        return res.send("Succesfull. Your password has been changed.");
      } else {
        return res.status(400).send("Your password is incorrect.");
      }
    } else {
      return res.status(400).send("Something went wrong.");
    }
  } catch (err) {
    next(err);
  }
};

module.exports.updateProfileImage = async (req, res, next) => {
  try {
    const { id } = req.body;
    const newFilePath = req.file.path;
    await Users.findByIdAndUpdate(id, { profileImage: newFilePath });
    return res.send(newFilePath);
  } catch (err) {
    next(err);
  }
};
