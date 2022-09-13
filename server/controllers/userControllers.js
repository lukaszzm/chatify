const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await Users.find({ _id: req.params.id }, {_id: 1, firstName: 1, lastName: 1, profilePath: 1});
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
      { firstName: 1, lastName: 1, profilePath: 1 }
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
    if (user) {
      res.status(400).send("This email is already used!");
      return;
    }

    const newUser = new Users({
      email: email,
      password: bcrypt.hashSync(req.body.password, 12),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePath:
        req.body.profilePath ||
        process.env.PROFILE_PATH,
    });

    newUser.save();
    const id = newUser._id.toString();
    let token;
    try {
      token = jwt.sign(id, process.env.JWT_TOKEN);
    } catch (err) {
      res.status(400).send("Something went wrong.");
    }
    return res.send({ id, token});
  } catch (err) {
    next(err);
  }
};

module.exports.updateFirstName = async (req, res, next) => {
  try {
    const id = req.body.id;
    const newFirstName = req.params.firstName;
    await Users.findByIdAndUpdate(id, { firstName: newFirstName });
  } catch(err) {
    next(err);
  }
  return res.send("Success! Your first name has been updated.");
}

module.exports.updateLastName = async (req, res, next) => {
  try {
    const id = req.body.id;
    const newLastName = req.params.lastName;
    await Users.findByIdAndUpdate(id, { lastName: newLastName })
  } catch(err) {
    next(err);
  }
  return res.send("Success! Your last name has been updated.");
}