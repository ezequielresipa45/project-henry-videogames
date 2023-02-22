// aca van los controlers required
const getVideoGames = require("../controllers/getVideoGames.controller");

const getVideoGamesQuery = require("../controllers/getVideoGamesQuery.controller");

const getVideoGamesId = require("../controllers/getVideoGamesId.controller");

const postVideoGames = require("../controllers/postVideoGames.controller");

const { Genre } = require("../db.js");

const Router = require("express");

const router = Router();

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const listVideoGamesQuery = await getVideoGamesQuery(name);
      return res.status(200).json(listVideoGamesQuery);
    } else {
      const listVideoGames = await getVideoGames();

      return res.status(200).json(listVideoGames);
    }
  } catch (error) {
    if (error.message === "This videogame does not exist") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: error.message });
    }
  }
});

router.get("/videogame/:idVideogame", async (req, res) => {
  try {
    const { idVideogame } = req.params;

    console.log(idVideogame);
    const listVideoGamesForId = await getVideoGamesId(idVideogame);
    res.status(200).json(listVideoGamesForId);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/videogames", async (req, res) => {
  const {
    name,
    description,
    released,
    rating,
    platforms,
    genres,
    background_image,
  } = req.body;
  try {
    // ["rpg", "strategy", "action"]

    let arrayGenres = [];

    for (let i = 0; i < genres.length; i++) {
      const searchGenres = await Genre.findOne({
        where: { name: genres[i] },
        attributes: ["id"],
      });

      arrayGenres.push(searchGenres.dataValues.id);
    }

    if (arrayGenres.length > 0) {
      const addVideoGames = await postVideoGames(
        name,
        description,
        released,
        rating,
        platforms,
        background_image
      );
      await addVideoGames.addGenres(arrayGenres);

      res.status(201).json(addVideoGames);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
