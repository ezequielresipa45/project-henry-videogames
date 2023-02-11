const { Genre } = require("../db.js");

const getGenre = async () => {
    const getGenreList = await Genre.findAll();
    return getGenreList;
  };
  
  module.exports = getGenre;