const { Videogame, Genre } = require("../db.js");



const getVideoGames = async () => {
  const videogameList = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return videogameList;
};

module.exports = getVideoGames;
