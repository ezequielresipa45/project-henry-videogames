const { Videogame } = require("../db.js");


const createVideoGame = async ( name, description, released, rating, platforms,background_image) => {

    const newVideoGame = await Videogame.create({ name, description, released, rating, platforms,background_image });
    
    return newVideoGame;
    
    };


    module.exports = createVideoGame;
    