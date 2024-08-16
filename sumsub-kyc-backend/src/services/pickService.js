const { Pick } = require("../models/index");

const createUserPick = async (pick) => {
  return Pick.create(pick);
};

const getPickWithMatchId = async (match_id) => {
  return await Pick.findOne({ match_id: match_id });
};

const getUserPick = async (id) => {
  return Pick.find({ user_id: id });
};

const getUserPickWithMatchId = async (match_id) => {
  return Pick.find({ match_id: match_id });
};

const findByUserIdAndUpdate = async (id, score) => {
  return Pick.findOneAndUpdate(
    { user_id: id },
    { $set: { points: score } }
  );
};
const findByMatchIdAndUpdate = async (id, updated_pick) => {
  return Pick.findOneAndUpdate(
    { match_id: id },
    { $set: { ...updated_pick } }
  );
};

module.exports = {
  createUserPick,
  getUserPick,
  getUserPickWithMatchId,
  findByUserIdAndUpdate,
  getPickWithMatchId,
  findByMatchIdAndUpdate,
};
