const { basedir } = global;
const { createError } = require(`${basedir}/helpers`);
const { User, schemas } = require(`${basedir}/models/user`);

const updateSubscription = async (req, res) => {
  const { error } = schemas.updateSubscription.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json(req.body);
};

module.exports = updateSubscription;
