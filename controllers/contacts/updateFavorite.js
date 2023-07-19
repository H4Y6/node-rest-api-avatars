const { basedir } = global;
const { createError } = require(`${basedir}/helpers`);
const { Contact, schemas } = require(`${basedir}/models/contact`);

const updateFavorite = async (req, res) => {
  const { error } = schemas.updateFavorite.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw createError(400, "missing field favorite");
  }
  res.json(result);
};

module.exports = updateFavorite;
