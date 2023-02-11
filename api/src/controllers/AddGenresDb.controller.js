const { Genre } = require("../db.js");

const addGenresDb = async (name) => {
  const newData = await Genre.create({ name });

  return newData;
};

module.exports = addGenresDb;
