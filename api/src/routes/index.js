const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videoGamesRouter = require("./videogames.routes.js");
const genresRouter = require("./genre.routes.js");
const router = Router();

router.get("/", (req, res) => {
  res.send("Estas en la ruta /");
});

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", videoGamesRouter);
router.use("/genres", genresRouter);



// Llamada a la api videogames, nos traemos los generos y los agregamos a la bd.

const axios = require("axios");
const addGenresDb = require("../controllers/addGenresDb.controller");

(async function traerDatosDeLaApi() {
  const data = await axios(
    "https://api.rawg.io/api/genres?key=7766812f293742f8a1efa2ac33903b70"
  );

  let datosApis = data.data.results;

  datosApis.map((date) => {
    addGenresDb(date.name);
  });
})();

module.exports = router;
