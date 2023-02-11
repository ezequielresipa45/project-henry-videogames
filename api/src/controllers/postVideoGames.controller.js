const { Videogame } = require("../db.js");


const createVideoGame = async ( name, description, released, rating, platforms) => {

    const newVideoGame = await Videogame.create({ name, description, released, rating, platforms });
    
    return newVideoGame;
    
    };


    module.exports = createVideoGame;
    