const axios = require('axios');
const crypto = require('crypto');
const { User } = require("../models/index");
const { password } = require("../validations/custom.validation");

const findByEmail = async (email) => {
  return await User.findOne({ email: email });
};

const getAll = async () => {
  return await User.find({}).sort({ points: -1 });
};

const generateAccessToken = async (body) => {
  const {email} = body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return null; 
  }

  const userId = user._id;
  const timestamp = Math.floor(Date.now() / 1000);
  const method = 'POST';
  const url = `/resources/accessTokens?userId=${userId}&levelName=basic-kyc-level&ttlInSecs=600`;
  const requestBody = JSON.stringify(body);

  const dataToSign = `${timestamp}${method}${url}${requestBody}`;

  const signature = crypto
    .createHmac('sha256', process.env.SECRET_TOKEN)
    .update(dataToSign)
    .digest('hex');

  const response = await axios.post(
    `https://api.sumsub.com${url}`,
    body, // Include the request body in the POST request
    {
      headers: {
        'X-App-Token': process.env.SUMSUB_APP_TOKEN,
        'X-App-Access-Sig': signature,
        'X-App-Access-Ts': timestamp
      }
    }
  );

  return response.data;
};


const createUser = async (body) => {
  // const { email, password } = body;

  // const existingUser = await User.findOne({ email });

  // if (existingUser) {
  //   const isMatch = await bcrypt.compare(password, existingUser.password);

  //   if (isMatch) {
  //     throw new Error("User already exists with the same password.");
  //   } else {
  //     throw new Error("Email already in use.");
  //   }
  // }

  const newUser = new User({
    ...body,
  });
  const encPass = await newUser.encryptPassword(body.password);
  newUser.password = encPass;

  return await newUser.save();
};

const findById = async (id) => {
  return await User.findById(id);
};

const findByIdAndUpdatePoints = async (id, score, points) => {
  return await User.findOneAndUpdate(
    { _id: id },
    { $set: { points: points + score } }
  );
};

module.exports = {
  findByIdAndUpdatePoints,
  findByEmail,
  findById,
  createUser,
  getAll,
  generateAccessToken,
};
