const mongoose = require("mongoose");
const { Schema } = mongoose;
const PickSchema = mongoose.Schema(
  {
    match_id: {
      type: Schema.Types.ObjectId,
      ref: "Match",
      default: mongoose.Types.ObjectId,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: mongoose.Types.ObjectId,
      required: true,
    },
    pick: { type: String, default: null, required: true },
    round: { type: Number, default: null, required: true },
    method: { type: String, default: null, required: true },
    points: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Pick = mongoose.model("Pick", PickSchema);
module.exports = Pick;
