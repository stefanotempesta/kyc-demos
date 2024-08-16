const jwt = require("jsonwebtoken");
const { userService } = require("../../services/index");
const config = require("../../config/EnvConfig");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email)
      return res
        .status(400)
        .send({ success: false, message: "Email is Required" });

    if (!password)
      return res
        .status(400)
        .send({ success: false, message: "Password is Required" });

    let user = await userService.findByEmail(email);

    if (!user) {
      user = await userService.createUser({ email, password });
    }

    if (user) {
      const isValid = await user.validPassword(password);
      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "email or password incorrect",
        });
      }

      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id,
        },
        config.jwt.secret,
        {
          expiresIn: config.jwt.ExpirationTime,
        }
      );
      return res.status(200).send({
        message: "Auth successful",
        email:user.email,
        token: token,
        uid: user._id,
      });
    } else {
      res
        .status(400)
        .send({ success: false, message: "No User Exist on this email" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.decoded.userId;

    const user = await userService.findById(id);
    if (user) {
      return res.status(200).json({
        message: "user found",
        uid: user._id,
        email: user.email,
        joined: user.created_At,
      });
    }
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

module.exports = {
  login,
  getUser,
};
