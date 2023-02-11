const { Videogame, Genre } = require("../db.js");

const getVideoGamesId = async (id) => {
  const getVideoGameForId = await Videogame.findByPk(id, {
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  return getVideoGameForId;
};


module.exports = getVideoGamesId;