const { Videogame } = require("../db.js");
const { Op } = require("sequelize");

// MODIFICARLO  YA QUE LO QUE HAY QUE HACER ES QUE BUSQUE LOS PRIMEROS 15 VIDEOJUEGOS Q COINCIDAN CON LA PALABRA Q INGRESE... OSEA HAY QE HACER UN LIKE..

const getVideoGamesQuery = async (name) => {
  const videogameListQuery = await Videogame.findAll({
    where: { name: { [Op.iLike]: `%${name}%` } }, limit:15,
  });

  if (videogameListQuery) return videogameListQuery;

  throw new Error("This videogame does not exist");
};

module.exports = getVideoGamesQuery;
