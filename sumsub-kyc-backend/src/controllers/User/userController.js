const { userService } = require("../../services/index");

const me = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Token is not valid",
      });
    }
    return res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAccessToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const accessToken = await userService.generateAccessToken(req.body);

    if (!accessToken) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(accessToken);
  } catch (error) {
    console.error('Error getting access token:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = {
  me,
  createUser,
  getAccessToken,
};
