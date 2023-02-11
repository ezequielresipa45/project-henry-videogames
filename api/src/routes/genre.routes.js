const Router = require("express");
const getGenre = require("../controllers/getGenre.controller");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const genresList = await getGenre();
    res.status(200).json(genresList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;