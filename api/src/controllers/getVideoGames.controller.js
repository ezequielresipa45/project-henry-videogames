const { Videogame } = require("../db.js");



const getVideoGames = async () => {
  const videogameList = await Videogame.findAll();
  return videogameList;
};

module.exports = getVideoGames;
