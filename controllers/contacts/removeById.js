const { basedir } = global;
const { createError } = require(`${basedir}/helpers`);
const { Contact } = require(`${basedir}/models/contact`);

const removeById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw createError(404);
  }
  res.json({ message: "Contact`s deleted" });
};

module.exports = removeById;
