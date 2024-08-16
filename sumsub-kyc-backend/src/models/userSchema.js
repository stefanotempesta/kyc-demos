const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true,required: true  },
    password: { type: String, required: true,required: true  },
    userId: { type: String, default: null },
    token: { type: String, default: null },
    points: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.encryptPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

userSchema.methods.validPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
